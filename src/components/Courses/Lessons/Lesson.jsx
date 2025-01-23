// Lesson.js
import React, { useState } from "react";
import { trash, add_new } from "../../../Assets/index.js";
import AddLesson from "./AddLesson.jsx";
import AddTest from "../Test/AddTest.jsx";
import { useForm } from "react-hook-form";
import ConfirmationDelete from "../../../Common/ConfirmationDelete.jsx";
import LessonModal from "./LessonModal.jsx";

const Lesson = ({
  lessons,
  moduleDetails,
  addLesson,
  deleteLesson,
  updateLesson,
  updateTestInCourseDetails,
}) => {
  console.log("🚀 ~ moduleDeatils:", moduleDetails)
  const [showModal, setShowModal] = useState(false);
  const [isAddTest, setIsAddTest] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [activeLessonData, setActiveLessonData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    reset();
  };

  const handleAddLesson = (data) => {
    if (!data.lessonName) {
      setError("Lesson name is required");
      return;
    }

    const newLesson = {
      lesson_id: Date.now(),
      lesson_name: data.lessonName,
      content: "",
      Duration: "",
      sequence: lessons.length + 1,
    };

    addLesson(newLesson);
    setActiveLessonId(newLesson.lesson_id); // Set the new lesson as active
    setActiveLessonData(newLesson); // Populate the active lesson data
    reset();
    setIsAddTest(false);
    closeModal();
  };

  const handleDeleteLesson = (lessonId) => {
    setLessonToDelete(lessonId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (lessonToDelete && deleteLesson) {
      deleteLesson(lessonToDelete);
    }
    setShowDeleteModal(false);
    setLessonToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setLessonToDelete(null);
  };

  const toggleView = (view) => {
    setIsAddTest(view === "test");
    setActiveLessonId(view === "lesson" ? activeLessonId : null); // Clear active lesson when switching to Test
  };

  const handleLessonClick = (lessonId) => {
    setActiveLessonId(lessonId);
    const selectedLesson = lessons.find(
      (lesson) => lesson.lesson_id === lessonId
    );
    setActiveLessonData(selectedLesson);
    setIsAddTest(false); // Switch back to Lesson view when selecting a lesson
  };

  const handleUpdateLesson = (updatedData) => {
    updateLesson(updatedData);
  };

  const handleSaveTest = (testData) => {
    console.log("🚀 ~ handleSaveTest ~ testData:", testData)
    updateTestInCourseDetails(activeLessonId, testData);
  };

  return (
    <>
      <div className="flex">
        <div className="mt-4 w-1/5">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.lesson_id}
              className={`border-l-2 p-3 mb-4 hover:text-green-500 hover:border-green-500 bg-neutral-100 flex justify-between items-center ${
                activeLessonId === lesson.lesson_id
                  ? "border-green-500 text-green-500"
                  : ""
              }`}
              onClick={() => handleLessonClick(lesson.lesson_id)}
            >
              <div>
                <div className="text-xs text-neutral-500 pb-2">
                  Lesson {index + 1}
                </div>
                <div className="text-sm">{lesson.lesson_name}</div>
              </div>
              <button onClick={() => handleDeleteLesson(lesson.lesson_id)}>
                <img src={trash} alt="trashicon" className="h-4" />
              </button>
            </div>
          ))}
          <div className="border-dashed border-2 mb-4 border-green-500 hover:border-2 hover:border-green-500 flex justify-center items-center">
            <button className="flex py-3 justify-center" onClick={openModal}>
              <img src={add_new} alt="add new icon" className="h-5" />
              <div className="text-sm hover:text-green-500 pl-1">Add</div>
            </button>
          </div>
          <div
            className={`border-l-2 p-3 mb-4 hover:border-green-500 bg-zinc-100 ${
              isAddTest
                ? "border-green-500 text-green-500"
                : "border-neutral-300"
            }`}
            onClick={() => toggleView("test")}
          >
            <div className="text-sm">Test</div>
          </div>
        </div>
        {isAddTest ? (
          <AddTest moduleDetails={moduleDetails} onSave={handleSaveTest} />
        ) : (
          <AddLesson
            lessonData={activeLessonData} // Pass active lesson data to AddLesson
            onSave={handleUpdateLesson}
          />
        )}
        <LessonModal
          showModal={showModal}
          closeModal={closeModal}
          handleAddLesson={handleSubmit(handleAddLesson)}
          errors={errors}
          register={register}
        />
        {showDeleteModal && (
          <ConfirmationDelete
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            message="Are you sure you want to delete this lesson?"
          />
        )}
      </div>
    </>
  );
};

export default Lesson;
