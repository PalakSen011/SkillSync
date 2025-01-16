import React, { useState } from "react";
import editIcon from "../assets/edit-black.svg";
import trash from "../assets/delete-red.svg";
import Lesson from "../components/Lesson";

const CourseDetails = () => {
  const [activeTab, setActiveTab] = useState("details"); // Manage active button state

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold mb-5">Course Details</div>
        <div className="">
          <button className="btn-primary flex items-end">Back</button>
        </div>
      </div>

      <div className="min-w-full font-sm mt-4 p-5 bg-white ">
        <div className="flex justify-between">
          <div>
            <span className="btn-active text-sm">Active</span>
          </div>
          <div className="flex gap-4">
            <button className="p-2 border border-neutral-300">
              <img src={editIcon} alt="" className="" />
            </button>
            <button className="p-2 border border-neutral-300">
              <img src={trash} alt="" className="" />
            </button>
          </div>
        </div>
        <div className="mt-4 ml-1 flex">
          <div className="flex flex-col w-1/3">
            <div className="mb-1 text-sm font-semibold">Title</div>
            <div className="text-sm text-neutral-500 font-light mb-1">
              Compensation and Benefits Policies
            </div>
          </div>
          <div className="flex flex-col w-1/6">
            <div className="mb-1 text-sm font-semibold">Type</div>
            <div className="text-sm text-neutral-500 font-light mb-1">
              Role-specific
            </div>
          </div>
          <div className="flex flex-col w-1/6">
            <div className="mb-1 text-sm font-semibold">Category</div>
            <div className="text-sm text-neutral-500 font-light mb-1">
              Compliance training
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-6 gap-6 text-slate-800">
        <div
          className={`py-3 px-14 bg-white font-semibold ${
            activeTab === "details"
              ? "text-green-500 border-b-2 border-b-green-500"
              : "hover:text-green-500 hover:border-b-2 border-b-transparent"
          }`}
        >
          <button onClick={() => setActiveTab("details")}>Details</button>
        </div>
        <div
          className={`py-3 px-10 bg-white font-semibold ${
            activeTab === "assignees"
              ? "text-green-500 border-b-2 border-b-green-500"
              : "hover:text-green-500 hover:border-b-2 border-b-transparent"
          }`}
        >
          <button onClick={() => setActiveTab("assignees")}>
            Assignees (28)
          </button>
        </div>
      </div>
      <div className="bg-white flex">
        <Lesson />
      </div>
    </>
  );
};

export default CourseDetails;
