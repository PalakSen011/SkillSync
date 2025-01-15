import React from "react";
import add_new from "../assets/add-new.png";
import AddLesson from "./AddLesson";
import AddTest from "./AddTest";

const Module = () => {
  return (
    <>
      <div className=" flex">
        <div className="mt-4 w-1/4">
          <div className=" border-l-2 border-neutral-300 p-3 mb-4 hover:text-green-500 hover:border-green-500 bg-zinc-100">
            <div className="text-xs text-neutral-500 pb-2">Leasson 1</div>
            <div className="text-sm ">Lesson Name 1</div>
          </div>
          <div className=" border-l-2 border-neutral-300 p-3 mb-4 hover:text-green-500 hover:border-green-500 bg-zinc-100">
            <div className="text-xs text-neutral-500 pb-2">Leasson 2</div>
            <div className="text-sm ">Lesson Name 1</div>
          </div>
          <div className=" border-l-2 border-neutral-300 p-3 mb-4 hover:text-green-500 hover:border-green-500 bg-zinc-100">
            <div className="text-xs text-neutral-500 pb-2">Leasson 3</div>
            <div className="text-sm ">Lesson Name 1</div>
          </div>
          <div className="border-dashed border-2 mb-4 border-green-500 hover:border-2 hover:border-green-500 flex justify-center items-center">
            <button className="flex  py-3 justify-center">
              <img src={add_new} alt="add new icon" className="h-5" />
              <div className="text-sm hover:text-green-500 pl-1">Add</div>
            </button>
          </div>

          <div className="border-l-2 border-neutral-300 p-3 mb-4  hover:border-green-500 bg-zinc-100">
            <div className="text-sm ">Test</div>
          </div>
        </div>
        {/* Main content area with input fields */}
        {/* <AddLesson/> */}
        <AddTest/>
      </div>
    </>
  );
};

export default Module;
