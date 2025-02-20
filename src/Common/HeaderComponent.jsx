import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../Assets/logo.svg";
import notification from "../Assets/notification.svg";
import dropDownIcon from "../Assets/dropdownIcon.svg";
import UserImg from "../../public/UserImg.jpeg";
import ConfirmLogoutModal from "./ConfirmLogoutModal";

const HeaderComp = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle logout confirmation
  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    console.log("Logged out");
    navigate("/sign-in");
    toast.success("Successfully logged out!");
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
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-3 py-2 hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Confirm Logout Modal */}
      <ConfirmLogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default HeaderComp;
