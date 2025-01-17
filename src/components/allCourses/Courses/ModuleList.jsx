import React from "react";
import edit_module from "../../assets/edit-grey.png";
import add_new from "../../assets/add-new.png";
import trash from "../../assets/trash.png";
import Module from "../Module";

const ModuleList = ({ modules, onAddClick, onDeleteClick }) => (
  <div className="min-w-full mt-4 h-screen bg-white">
    <div className="flex gap-6 p-4 pb-0">
      {modules.map((module, index) => (
        <button
          key={module.id}
          className="flex px-4 py-3 hover:border-b-2 hover:border-green-500"
        >
          <div className="text-sm hover:text-green-500">
            Module {index + 1}: {module.name}
          </div>
          <img
            src={edit_module}
            alt="edit icon"
            className="h-4 pl-1 cursor-pointer"
            onClick={() => onEditClick(module)}
          />
          <img
            src={trash}
            alt="trash icon"
            className="h-4 pl-1 cursor-pointer"
            onClick={() => onDeleteClick(module.id)}
          />
        </button>
      ))}
      <button
        className="flex px-4 py-3 hover:border-b-2 hover:border-green-500"
        onClick={onAddClick}
      >
        <img src={add_new} alt="add new icon" className="h-5" />
        <div className="text-sm hover:text-green-500 pl-1">Add</div>
      </button>
    </div>
    <hr className="h-px border bg-neutral-500" />
    <Module />
  </div>
);

export default ModuleList;
