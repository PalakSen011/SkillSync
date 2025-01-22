import React, { useState } from "react";

import { useDispatch } from "react-redux";

import Lesson from "../Lessons/Lesson";
import ModuleModal from "./ModuleModal";
import { edit_grey, trash, add_new } from "../../../Assets";

const AddModule = ({ modules, setModules }) => {
  const [moduleData, setModuleData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState(null);

  const dispatch = useDispatch();

  const handleAddModuleClick = () => {
    setModuleData(null);
    setIsModalOpen(true);
  };

  const handleDeleteModule = (id) => {
    setModules(modules.filter((mod) => mod.module_id !== id));
    // Reset activeModuleId if the current active module is deleted
    if (activeModuleId === id) {
      setActiveModuleId(null);
    }
  };

  const handleModuleClick = (id) => {
    setActiveModuleId(id);
  };

  const handleModalClose = () => {
    setModuleData(null);
    setIsModalOpen(false);
  };

  const handleEditModule = (module) => {
    setModuleData(module);
    setIsModalOpen(true);
  };

  const handleSaveModule = (module) => {
    const updatedModules = module.module_id
      ? modules.map((mod) =>
          mod.module_id === module.module_id ? module : mod
        )
      : [...modules, { ...module, module_id: Date.now() }];

    setModules(updatedModules);
    setModuleData(null);
    handleModalClose();
  };

  const addLessonToActiveModule = (newLesson) => {
   
    setModules(
      modules.map((module) =>
        module.module_id === activeModuleId
          ? { ...module, lessons: [...(module.lessons || []), newLesson] }
          : module
      )
    );
  };

  
  return (
    <div className="min-w-full mt-4 h-screen bg-white">
      <div className="flex gap-6 p-4 pb-0">
        {modules?.map((module) => (
          <div
            key={module.module_id}
            className={`flex px-4 py-3 ${
              activeModuleId === module.module_id
                ? "border-b-2 border-green-500 text-green-500"
                : "hover:border-b-2 hover:border-green-500"
            }`}
            onClick={() => handleModuleClick(module.module_id)}
          >
            <div className="text-sm">{module.module_name}</div>
            <img
              src={edit_grey}
              alt="edit"
              className="h-4 pl-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleEditModule(module);
              }}
            />
            <img
              src={trash}
              alt="trash"
              className="h-4 pl-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteModule(module.module_id);
              }}
            />
          </div>
        ))}
        <button
          className="flex px-4 py-3 hover:border-b-2 hover:border-green-500"
          onClick={handleAddModuleClick}
        >
          <img src={add_new} alt="add new" className="h-5" />
          <div className="text-sm pl-1">Add</div>
        </button>
      </div>
      <hr className="h-px border bg-neutral-500" />

      {/* Render Lesson only if there are modules and an active module is selected */}
      {modules.length > 0 && activeModuleId && (
        <Lesson
          lessons={
            modules?.find((module) => module.module_id === activeModuleId)
              ?.lessons || []
          }
          addLesson={addLessonToActiveModule}
        />
      )}

      {isModalOpen && (
        <ModuleModal
          moduleData={moduleData}
          onClose={handleModalClose}
          onSave={handleSaveModule}
        />
      )}
    </div>
  );
};

export default AddModule;
