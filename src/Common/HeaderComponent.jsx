import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import notification from "../assets/notification.svg";
import dropDownIcon from "../assets/dropDownIcon.svg";
import UserImg from "../../public/UserImg.jpeg"
const   HeaderComp = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // localStorage.clear(); clearing localStorage
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-slate-800 p-4 pr-8">
      <div>
        <img className="h-12" src={logo} alt="Skill Sync Logo" />  
      </div>

      <div className="flex items-center space-x-4">
        <img
          className="h-6 cursor-pointer"
          src={notification}
          alt="Notification Icon"
        />
        <p className="text-white text-2xl font-medium">|</p>
        <div className="w-12 h-10 border border-slate-600 overflow-hidden">
          <img
            className="w-full h-10 object-cover"
            src={UserImg}
            alt="User Image"
          />
        </div>
        <div>
          <h3 className="text-white text-m">User Name</h3>
          <p className="text-green-500 text-xs">Admin</p>
        </div>
        <img src={dropDownIcon} alt="dropDownIcon" />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HeaderComp;
