import React, { useState, useEffect } from "react";

import Lesson from "../Lessons/Lesson";
import ModuleModal from "./ModuleModal";
import ConfirmationDelete from "../../../Common/ConfirmationDelete";

import { edit_grey, trash, add_new } from "../../../Assets";

const AddModule = ({ modules, setModules, updateTestInCourseDetails }) => {
  const [moduleData, setModuleData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);

  // Set the first module as active when the component renders
  useEffect(() => {
    if (modules.length === 1) {
      setActiveModuleId(modules[0]?.module_id || null);
    }
  }, [modules]);

  // Handle the click event to add a new module
  const handleAddModuleClick = () => {
    setModuleData(null);
    setIsModalOpen(true);
  };

  // Handle the click event to delete a module
  const handleDeleteModule = (id, moduleName) => {
    setModuleToDelete({ module_id: id, module_name: moduleName });
    setIsDeleteModalOpen(true); // Open the confirmation modal
  };

  // Confirm the deletion of a module
  const confirmDelete = () => {
    // Perform the deletion after confirmation
    const updatedModules = modules.filter(
      (mod) => mod.module_id !== moduleToDelete.module_id
    );

    // Set the active module to the previous one, if any
    if (activeModuleId === moduleToDelete.module_id) {
      const previousModule = updatedModules[updatedModules.length - 1];
      setActiveModuleId(previousModule ? previousModule.module_id : null);
    }

    setModules(updatedModules);
    setIsDeleteModalOpen(false); // Close the delete confirmation modal
  };

  // Handle the click event to select a module
  const handleModuleClick = (id) => {
    setActiveModuleId(id);

    // Get the first lesson of the selected module and set it as active
    const module = modules.find((module) => module.module_id === id);
    if (module && module.lessons && module.lessons.length > 0) {
      setActiveLessonId(module.lessons[0].lesson_id); // Set the first lesson as active
    }
  };

  // Handle the modal close event
  const handleModalClose = () => {
    setModuleData(null);
    setIsModalOpen(false);
  };

  // Handle the click event to edit a module
  const handleEditModule = (module) => {
    setModuleData(module);
    setIsModalOpen(true);
  };

  // Handle the save event for a module
  const handleSaveModule = (module) => {
    console.log("🚀 ~ handleSaveModule ~ module:", module);

    // Determine if it's a new or existing module
    const isNewModule = !module.module_id;

    const updatedModuleId = isNewModule ? Date.now() : module.module_id;

    if (isNewModule) {
      // Adding a new module
      const defaultLesson = {
        lesson_id: Date.now() + 2,
        lesson_name: `Lesson 1`,
        duration: "",
        sequence: 1,
        content: "",
      };

      const newModule = {
        module_id: updatedModuleId,
        module_name: module.module_name,
        sequence: "",
        type: "chapter",
        lessons: [defaultLesson],
      };

      // Update modules and set the new module as active
      setModules([...modules, newModule]);
      setActiveModuleId(updatedModuleId);
    } else {
      // Editing an existing module
      const updatedModules = modules.map((mod) =>
        mod.module_id === module.module_id
          ? { ...mod, module_name: module.module_name }
          : mod
      );
      setModules(updatedModules);
    }

    setIsModalOpen(false);
    setModuleData(null);
  };

  // Add a lesson to the active module
  const addLessonToActiveModule = (newLesson) => {
    if (!activeModuleId) return;

    setModules(
      modules.map((module) =>
        module.module_id === activeModuleId
          ? { ...module, lessons: [...(module.lessons || []), newLesson] }
          : module
      )
    );

    setActiveModuleId(activeModuleId);
  };

  // Delete a lesson from the active module
  const deleteLessonFromActiveModule = (lessonId) => {
    if (!activeModuleId) return;

    setModules(
      modules.map((module) =>
        module.module_id === activeModuleId
          ? {
              ...module,
              lessons: module.lessons?.filter(
                (lesson) => lesson.lesson_id !== lessonId
              ),
            }
          : module
      )
    );
    setActiveModuleId(activeModuleId);
  };

  // Update a lesson in the active module
  const updateLessonFromActiveModule = (updatedLesson) => {
    console.log(
      "🚀 ~ updateLessonFromActiveModule ~ updatedLesson:",
      updatedLesson
    );
    if (!activeModuleId) return;

    setModules(
      modules.map((module) =>
        module.module_id === activeModuleId
          ? {
              ...module,
              lessons: module.lessons?.map((lesson) =>
                lesson.lesson_id === updatedLesson.lesson_id
                  ? { ...lesson, ...updatedLesson }
                  : lesson
              ),
            }
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
              onClick={(event) => {
                event.stopPropagation();
                handleEditModule(module);
              }}
            />
            <img
              src={trash}
              alt="trash"
              className="h-4 pl-1 cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                handleDeleteModule(module.module_id, module.module_name); // Pass module name for confirmation
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

      {modules.length > 0 && activeModuleId && (
        <Lesson
          lessons={
            modules.find((module) => module.module_id === activeModuleId)
              ?.lessons || []
          }
          moduleDetails={modules}
          addLesson={addLessonToActiveModule}
          deleteLesson={deleteLessonFromActiveModule}
          updateLesson={updateLessonFromActiveModule}
          updateTestInCourseDetails={updateTestInCourseDetails}
        />
      )}

      {isModalOpen && (
        <ModuleModal
          moduleData={moduleData}
          onClose={handleModalClose}
          onSave={handleSaveModule}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmationDelete
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          moduleName={moduleToDelete?.module_name}
          message={`Are you sure you want to delete the module "${moduleToDelete?.module_name}"?`}
        />
      )}
    </div>
  );
};

export default AddModule;
