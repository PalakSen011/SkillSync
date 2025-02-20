import React from "react";

import { NavLink } from "react-router-dom";

import { home, graduation_cap, user_settings } from "../Assets/index";
import {
  PATH_COURSES,
  PATH_DASHBOARD,
  PATH_USER_MANAGEMENT,
} from "../Constants/RouteConstants";

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
      <SidebarLink to={PATH_DASHBOARD} icon={home} label="Dashboard" />
      <SidebarLink
        to={PATH_COURSES}
        icon={graduation_cap}
        label="All Courses"
      />
      <SidebarLink
        to={PATH_USER_MANAGEMENT}
        icon={user_settings}
        label="User Management"
      />
    </div>
  );
};

export default SideBar;
