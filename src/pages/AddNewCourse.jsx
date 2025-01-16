import React, { useState } from "react";
import edit_module from "../assets/edit-grey.png";
import add_new from "../assets/add-new.png";
import trash from "../assets/trash.png";
import Module from "../components/Module";

const AddNewCourse = ({ onBackClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modules, setModules] = useState([]);
  const [moduleName, setModuleName] = useState("");
  const [moduleNumber, setModuleNumber] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [mandatoryAll, setMandatoryAll] = useState(false);

  const handleSave = () => {
    setCourseTitle("")
    console.log("Course saved:", courseData);
    // You can add additional logic here, like sending the data to an API or updating the parent component
  };

  const handleAddModuleClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModuleName("");
    setModuleNumber("");
  };

  const handleAddModule = () => {
    if (moduleName && moduleNumber) {
      setModules([...modules, { name: moduleName, number: moduleNumber }]);
      handleModalClose();
    }
  };

  const handleDeleteModule = (index) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold mb-5">Add New</div>
        <div className="flex gap-4">
          <button className="btn-primary flex items-end" onClick={onBackClick}>
            Back
          </button>
          <button className="btn-secondary flex items-end">Publish</button>
        </div>
      </div>

      <div className="min-w-full font-sm mt-4 p-5 bg-white">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Course details</div>
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
              className="border border-gray-300 px-3 py-2 text-sm"
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
              className="appearance-none border border-gray-300 px-3 py-2 text-sm"
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
              className="appearance-none border border-gray-300 px-3 py-2 text-sm"
            >
              <option value=""></option>
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <button
            className="btn-secondary flex items-end "
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>

      <div className="min-w-full mt-4 h-screen bg-white">
        <div className="flex gap-6 p-4 pb-0">
          {modules.map((module, index) => (
            <button
              key={index}
              className="flex px-4 py-3 hover:border-b-2 hover:border-green-500"
            >
              <div className="text-sm hover:text-green-500">
                {module.name} {module.number}
              </div>
              <img src={edit_module} alt="" className="h-4 pl-1" />
              <img
                src={trash}
                alt="trash icon"
                className="h-4 pl-1 cursor-pointer"
                onClick={() => handleDeleteModule(index)}
              />
            </button>
          ))}
          <button
            className="flex px-4 py-3 hover:border-b-2 hover:border-green-500"
            onClick={handleAddModuleClick}
          >
            <img src={add_new} alt="add new icon" className="h-5" />
            <div className="text-sm hover:text-green-500 pl-1">Add</div>
          </button>
        </div>
        <hr className="h-px border bg-neutral-500" />

        <Module />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Add Module</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium">Module Name</label>
                <input
                  type="text"
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Module Number</label>
                <input
                  type="text"
                  value={moduleNumber}
                  onChange={(e) => setModuleNumber(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button className="btn-secondary" onClick={handleModalClose}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddModule}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewCourse;
