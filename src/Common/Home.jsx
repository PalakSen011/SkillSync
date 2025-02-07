import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import HeaderComp from "./HeaderComponent";
import SideBar from "./SideBar";

const Home = () => {
  return (
    <>
      <div className="flex  bg-slate-100 ">
        {/* Main Content */}
        <div className="flex-1 sticky">
          <HeaderComp />
          <div className=" flex flex-row  text-black">
            <div className=" [box-shadow:1px_2px_12px_0px_rgba(0,_0,_0,_0.08)] w-1/4 h-screen bg-white">
              <SideBar />
            </div>
            <div className="p-6 w-full ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
