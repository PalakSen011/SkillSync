import React from "react";
import HeaderComp from "../components/HeaderComp";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex  bg-slate-100 ">
        {/* Main Content */}
        <div className="flex-1">
          <HeaderComp />
          <div className=" flex flex-row  text-black">
            <div class=" [box-shadow:1px_2px_12px_0px_rgba(0,_0,_0,_0.08)] w-1/5 h-screen bg-white">
              <SideBar />
            </div>
            <div className="p-6 ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
