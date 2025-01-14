import React from "react";
import { NavLink } from "react-router-dom";
import home from "../assets/home.svg";
import graduation_cap from "../assets/graduation-cap.svg";
import user_management from "../assets/user-settings.svg";

const SideBar = () => {
  return (
    <div className="m-3 p-1">
      {/* Dashboard Link */} 
      <NavLink
        to="/home/dashboard" // Updated to include '/home'
        className={({ isActive }) =>
          `flex items-center p-4 m-4 ml-0 hover:bg-green-400 hover:text-white ${
            isActive ? "bg-green-500 text-white" : ""
          }`
        }
      >
        <img src={home} alt="homeicon" />
        <span className="ml-2 hidden lg:inline">Dashboard</span>
      </NavLink>

      {/* User Management Link */}
      <NavLink
        to="/home/user-management" // Updated to include '/home'
        className={({ isActive }) =>
          `flex items-center  p-4 m-4 ml-0 hover:bg-green-400 hover:text-white ${
            isActive ? "bg-green-500 text-white" : ""
          }`
        }
      >
        <img src={user_management} alt="usericon" />
        <span className="ml-2 hidden lg:inline">User management</span>
      </NavLink>

      {/* All Courses Link */}
      <NavLink
        to="/home/all-courses" // Updated to include '/home'
        className={({ isActive }) =>
          `flex items-center p-4 m-4 ml-0 hover:bg-green-400 hover:text-white ${
            isActive ? "bg-green-500 text-white" : ""
          }`
        }
      >
        <img src={graduation_cap} alt="graduationicon" />
        <span className="ml-2 hidden lg:inline">All courses</span>
      </NavLink>
    </div>
  );
};

export default SideBar;
