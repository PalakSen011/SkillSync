import React from "react";
import edit_module from "../assets/edit-grey.png";
import add_new from "../assets/add-new.png";
import trash from "../assets/trash.png";
import Module from "../components/Module";
const AddNewCourse = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold mb-5">Add New</div>
        <div className="flex gap-4">
          <button className="btn-primary flex items-end">Back</button>
          <button className="btn-secondary flex items-end">Publish</button>
        </div>
      </div>
      <div className="min-w-full font-sm mt-4 p-5 bg-white">
        <div className="flex items-center justify-between">
          <div className="text-sm">Course details</div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="mandatoryAll" className="w-4 h-4" />
            <label htmlFor="mandatoryAll" className="text-sm">
              Mandatory to all
            </label>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-3">
          {/* Title input field */}
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="courseTitle"
              className="text-sm text-neutral-500 font-medium mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="courseTitle"
              className="border border-gray-300  px-3 py-2 text-sm"
            />
          </div>
          {/* Category dropdown */}
          <div className="flex flex-col w-1/4">
            <label
              htmlFor="category"
              className="text-sm text-neutral-500 font-medium mb-1"
            >
              Category
            </label>
            <select
              id="category"
              className="appearance-none border border-gray-300  px-3 py-2 text-sm"
            >
              <option value=""></option>
              <option value="Training">Training</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Learning</option>
            </select>
          </div>
          {/* Status dropdown */}
          <div className="flex flex-col w-1/4">
            <label
              htmlFor="status"
              className="text-sm text-neutral-500 font-medium mb-1"
            >
              Status
            </label>
            <select
              id="status"
              className="appearance-none border border-gray-300  px-3 py-2 text-sm"
            >
              <option value=""></option>
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <button className="btn-secondary flex items-end">Save</button>
        </div>
      </div>
      <div className="min-w-full mt-4 h-screen bg-white">
        <div className="flex gap-6 p-4 pb-0 ">
          <button className="flex px-4 py-3 hover:border-b-2 hover:border-green-500">
            <div className="text-sm hover:text-green-500">Module 1 </div>
            <img src={edit_module} alt="" className="h-4 pl-1" />
            <img src={trash} alt="trash icon" className="h-4 pl-1" />
          </button>
          <button className="flex px-4 py-3 hover:border-b-2 hover:border-green-500">
            <img src={add_new} alt="add new icon" className="h-5  " />
            <div className="text-sm hover:text-green-500 pl-1">Add</div>
          </button>
        </div>
          <hr className=" h-px border bg-neutral-500" />
        
        <Module />
      </div>
    </>
  );
};

export default AddNewCourse;
