import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Lesson from "../Lessons/Lesson";
import ModuleModal from "./ModuleModal";
import ConfirmationDelete from "../../../Common/ConfirmationDelete";

import { edit_grey, trash, add_new } from "../../../Assets";

const AddModule = ({ modules, setModules, updateTestInCourseDetails }) => {
  const { courseId } = useParams();
  const course = useSelector((state) =>
    state.courses.courses.find(
      (course) => course.course_id === parseInt(courseId)
    )
  );
  // State for managing modules and UI
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moduleData, setModuleData] = useState(null);
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);

  // Initialize with first module or course modules
  // useEffect(() => {
  //   if (modules.length === 1) {
  //     setActiveModuleId(modules[0]?.module_id);
  //   } else if (modules.length === 0 && course?.modules?.length > 0) {
  //     setModules(course.modules);
  //     setActiveModuleId(course.modules[0]?.module_id);
  //   }
  // }, [modules, course, setModules]);
  useEffect(() => {
    if (modules.length === 1) {
      setActiveModuleId(modules[0]?.module_id);
    }
  }, [modules]);

  // Module Management Functions
  const handleAddModuleClick = () => {
    setModuleData(null);
    setIsModalOpen(true);
  };

  const handleSaveModule = (moduleToSave) => {
    const isNewModule = !moduleToSave.module_id;
    const moduleId = isNewModule ? Date.now() : moduleToSave.module_id;

    if (isNewModule) {
      const newModule = {
        module_id: moduleId,
        module_name: moduleToSave.module_name,
        sequence: modules.length + 1,
        type: "chapter",
        lessons: [
          {
            lesson_id: Date.now(),
            lesson_name: "Lesson 1",
            duration: "",
            sequence: 1,
            content: "",
          },
        ],
        test: [
          {
            questions: [
              {
                id: Date.now().toString(),
                question: "",
                options: Array(4).fill({
                  option_id: "",
                  option: "",
                  isCorrect: false,
                }),
                type: "test",
              },
            ],
          },
        ],
      };

      setModules([...modules, newModule]);
      setActiveModuleId(moduleId);
    } else {
      const updatedModules = modules.map((mod) =>
        mod.module_id === moduleToSave.module_id
          ? { ...mod, module_name: moduleToSave.module_name }
          : mod
      );
      setModules(updatedModules);
    }

    setIsModalOpen(false);
    setModuleData(null);
  };

  const handleEditModule = (module) => {
    setModuleData(module);
    setIsModalOpen(true);
  };

  const handleDeleteModule = (id, moduleName) => {
    setModuleToDelete({ module_id: id, module_name: moduleName });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedModules = modules.filter(
      (mod) => mod.module_id !== moduleToDelete.module_id
    );

    if (activeModuleId === moduleToDelete.module_id) {
      const previousModule = updatedModules[updatedModules.length - 1];
      setActiveModuleId(previousModule ? previousModule.module_id : null);
    }

    setModules(updatedModules);
    setIsDeleteModalOpen(false);
  };

  // Lesson Management Functions
  const addLessonToModule = (newLesson) => {
    if (!activeModuleId) return;

    setModules(
      modules.map((module) =>
        module.module_id === activeModuleId
          ? {
              ...module,
              lessons: [
                ...(module.lessons || []),
                {
                  ...newLesson,
                  lesson_id: Date.now(),
                  sequence: (module.lessons?.length || 0) + 1,
                },
              ],
            }
          : module
      )
    );
  };

  const updateLessonInModule = (updatedLesson) => {
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

  const deleteLessonFromModule = (lessonId) => {
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
  };

  // Test Management
  const handleSaveTest = (testData) => {
    updateTestInCourseDetails(testData, activeModuleId);
  };

  return (
    <div className="min-w-full mt-4 h-screen bg-white">
      <div className="flex gap-6 p-4 pb-0">
        {/* Module Tabs */}
        {modules?.map((module) => (
          <div
            key={module.module_id}
            className={`flex px-4 py-3 cursor-pointer ${
              activeModuleId === module.module_id
                ? "border-b-2 border-green-500 text-green-500"
                : "hover:border-b-2 hover:border-green-500"
            }`}
            onClick={() => setActiveModuleId(module.module_id)}
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
                handleDeleteModule(module.module_id, module.module_name);
              }}
            />
          </div>
        ))}

        {/* Add Module Button */}
        <button
          className="flex px-4 py-3 hover:border-b-2 hover:border-green-500"
          onClick={handleAddModuleClick}
        >
          <img src={add_new} alt="add new" className="h-5" />
          <div className="text-sm pl-1">Add</div>
        </button>
      </div>

      <hr className="h-px border bg-neutral-500" />

      {/* Lessons Section */}
      {modules.length > 0 && activeModuleId && (
        <Lesson
          lessons={
            modules.find((module) => module.module_id === activeModuleId)
              ?.lessons || []
          }
          moduleDetails={modules}
          addLesson={addLessonToModule}
          deleteLesson={deleteLessonFromModule}
          updateLesson={updateLessonInModule}
          updateTestInCourseDetails={handleSaveTest}
        />
      )}

      {/* Modals */}
      {isModalOpen && (
        <ModuleModal
          moduleData={moduleData}
          onClose={() => {
            setIsModalOpen(false);
            setModuleData(null);
          }}
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
