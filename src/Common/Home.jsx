import React, { useEffect } from "react";
import HeaderComp from "./HeaderComp";
import SideBar from "./SideBar";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

//   useEffect(()=>{
// navigate("/home/dashboard");
//   },[])
  return (
    <>
      <div className="flex  bg-slate-100 ">
        {/* Main Content */}
        <div className="flex-1 sticky">
          <HeaderComp />
          <div className=" flex flex-row  text-black">
            <div class=" [box-shadow:1px_2px_12px_0px_rgba(0,_0,_0,_0.08)] w-1/4 h-screen bg-white">
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
