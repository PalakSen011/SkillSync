import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Lesson from "../Lessons/Lesson";
import ModuleModal from "./ModuleModal";
import { edit_grey, trash, add_new } from "../../../Assets";
import ConfirmationDelete from "../../../Common/ConfirmationDelete"; // Import ConfirmationDelete component

const AddModule = ({ modules, setModules, updateTestInCourseDetails }) => {
  const [moduleData, setModuleData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to control the delete confirmation modal
  const [moduleToDelete, setModuleToDelete] = useState(null); // Store the module to be deleted
  const [modulesCount, setModulesCount] = useState(modules.length); // Track the count of modules
  const [lessonsCount, setLessonsCount] = useState(0); // Track the count of lessons for the first module

  const dispatch = useDispatch();

  // Set the first module as active when the component renders
  useEffect(() => {
    if (modules.length > 0) {
      setActiveModuleId(modules[0].module_id);
      setModulesCount(modules.length);
    }
  }, [modules]);

  const handleAddModuleClick = () => {
    setModuleData(null);
    setIsModalOpen(true);
  };

  const handleDeleteModule = (id, moduleName) => {
    setModuleToDelete({ module_id: id, module_name: moduleName });
    setIsDeleteModalOpen(true); // Open the confirmation modal
  };

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
    const updatedModuleId = module.module_id || Date.now() + 1;

    // Update the lessonsCount based on the existing lessons count
    setLessonsCount(module.lessons ? module.lessons.length : 0);

    // Add a default lesson if it's a new module (doesn't have a module_id)
    const defaultLesson = {
      lesson_id: Date.now() + 2,
      lesson_name: `Lesson ${lessonsCount + 1}`,
      duration: "",
      sequence: lessonsCount + 1,
      content: "",
    };

    const defaultQuestion = {
      question_id: Date.now() + 3,
      question: "",
      option1: { name: "", isCorrect: false },
      option2: { name: "", isCorrect: false },
      option3: { name: "", isCorrect: false },
      option4: { name: "", isCorrect: false },
      type: "",
    };
    const updatedModules = module.module_id
      ? modules.map((mod) =>
          mod.module_id === module.module_id
            ? { ...module, module_id: updatedModuleId }
            : mod
        )
      : [
          ...modules,
          {
            module_id: updatedModuleId,
            module_name: `Module ${modulesCount + 1}`,
            sequence: modulesCount + 1,
            type: "chapter",
            lessons: [defaultLesson],
            questions: [defaultQuestion],
          },
        ];

    setModules(updatedModules);

    // Set the newly added module as active
    setActiveModuleId(updatedModuleId);

    setModuleData(null);
    setIsModalOpen(false);
    setModulesCount(modulesCount + 1); // Increment the module count
  };

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
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          moduleName={moduleToDelete?.module_name}
        />
      )}
    </div>
  );
};

export default AddModule;
