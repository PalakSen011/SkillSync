import React, { useState } from "react";
import add_new from "../assets/add-new.png";
import { FaTrashAlt } from "react-icons/fa"; // import trash icon
import trash from "../assets/trash.png";
import AddLesson from "./AddLesson"; // Assuming AddLesson is a separate component
import AddTest from "./AddTest"; // Assuming AddTest is a separate component

const Lesson = ({ onClick }) => {
  const [lessons, setLessons] = useState([]); // state to store lessons
  const [lessonName, setLessonName] = useState(""); // state for the lesson name input
  const [showModal, setShowModal] = useState(false); // state to show/hide the modal
  const [isAddTest, setIsAddTest] = useState(false); // state to toggle between AddLesson and AddTest
  const [error, setError] = useState(""); // state for form validation error

  // Handler to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Handler to close the modal
  const closeModal = () => {
    setShowModal(false);
    setError(""); // Reset error on closing the modal
  };

  // Handler to add a new lesson
  const addLesson = () => {
    if (!lessonName) {
      setError("Lesson name is required");
      return;
    }
    setLessons([...lessons, lessonName]);
    setIsAddTest(false);
    setLessonName(""); // Reset the input field
    closeModal(); // close the modal after adding
  };

  // Handler to delete a lesson
  const deleteLesson = (lessonName) => {
    setLessons(lessons.filter((lesson) => lesson !== lessonName));
  };

  // Handler to toggle between AddLesson and AddTest
  const toggleAddTest = () => {
    setIsAddTest(true);
  };

  return (
    <>
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
              <div className="text-sm">{lesson}</div>
            </div>
            <button onClick={() => deleteLesson(lesson)}>
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

      {/* Conditional rendering based on the toggle state */}
      {isAddTest ? <AddTest /> : <AddLesson />}
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white  p-8 w-1/4">
            <div className="text-sm text-neutral-500 font-medium ">
              Enter Lesson Name
            </div>
            <input
              type="text"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <div className="flex gap-4 mt-3 justify-end ">
              <button
                className="btn-primary "
                type="button"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="btn-secondary px-4 py-2 "
                type="button"
                onClick={addLesson}
              >
                Add Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lesson;
