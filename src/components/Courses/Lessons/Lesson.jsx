import React, { useState } from "react";
import { trash, add_new } from "../../../Assets/index.js";
import AddLesson from "./AddLesson.jsx";
import AddTest from "./AddTest";
const Lesson = ({ lessons, addLesson }) => {
  const [lessonName, setLessonName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isAddTest, setIsAddTest] = useState(false);
  const [error, setError] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setError("");
  };

  const handleAddLesson = () => {
    if (!lessonName) {
      setError("Lesson name is required");
      return;
    }
    const newLesson = {
      lesson_id: Date.now(),
      lesson_name: lessonName,
      content: "test content",
      Duration: "50min",
      sequence: lessons.length + 1,
    };
    addLesson(newLesson);
    setLessonName("");
    setIsAddTest(false);
    closeModal();
  };

 
  const handleDeleteLesson = (lessonId) => {
    addLesson((lessons) => lessons.filter((lesson) => lesson !== lessonId));
};


  // Handler to toggle between AddLesson and AddTest
  const toggleAddTest = () => {
    setIsAddTest(true);
  };

  return (
    <>
      <div className="flex">
        <div className="mt-4 w-1/5">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="border-l-2 border-neutral-300 p-3 mb-4 hover:text-green-500 hover:border-green-500 bg-neutral-100 flex justify-between items-center"
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
          <div className="border-l-2 border-neutral-300 p-3 mb-4 hover:border-green-500 bg-zinc-100">
            <div className="text-sm" onClick={toggleAddTest}>
              Test
            </div>
          </div>
        </div>
        {isAddTest ? <AddTest /> : <AddLesson />}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 w-1/4">
              <div className="text-sm text-neutral-500 font-medium">
                Enter Lesson Name
              </div>
              <input
                type="text"
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
                className="border p-2 w-full mb-4"
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <div className="flex gap-4 mt-3 justify-end">
                <button
                  className="btn-primary"
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="btn-secondary px-4 py-2"
                  type="button"
                  onClick={handleAddLesson}
                >
                  Add Lesson
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Lesson;
