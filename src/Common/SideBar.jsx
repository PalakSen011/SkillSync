import React from "react";
import { NavLink } from "react-router-dom";
import home from "../assets/home.svg";
import graduation_cap from "../assets/graduation-cap.svg";
import user_management from "../assets/user-settings.svg";

// Reusable SidebarLink component
const SidebarLink = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-4 m-4 ml-0 rounded hover:bg-green-400 hover:text-white transition ${
          isActive ? "bg-green-400 text-white" : ""
        }`
      }
    >
      <img src={icon} alt={`${label} icon`} className="w-5 h-5" />
      <span className="ml-2 hidden lg:inline">{label}</span>
    </NavLink>
  );
};

const SideBar = () => {
  return (
    <div className="m-3 text-sm p-1">
      <SidebarLink to="/dashboard" icon={home} label="Dashboard" />
      <SidebarLink to="/all-courses" icon={graduation_cap} label="All Courses" />
      <SidebarLink to="/user-management" icon={user_management} label="User Management" />
    </div>
  );
};

export default SideBar;
