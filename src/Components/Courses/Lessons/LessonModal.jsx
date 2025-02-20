import React from 'react';
import { useForm } from 'react-hook-form';

const LessonModal = ({ showModal, closeModal, handleAddLesson, errors, register }) => {
  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        
          <div className="text-sm text-neutral-500 font-medium mb-2">
            Enter Lesson Name
          </div>
          <form onSubmit={handleAddLesson} className="space-y-4">
            <input
              type="text"
              placeholder="Lesson Name"
              {...register("lessonName", { required: true })}
              className="border p-2 w-full"
            />
            {errors.lessonName && (
              <p className="text-red-500 text-xs">Lesson name is required</p>
            )}
            <div className="flex gap-4 mt-3 justify-end">
              <button
                type="button"
                className="btn-primary"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-secondary px-4 py-2"
              >
                Add Lesson
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default LessonModal;
