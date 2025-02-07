import React from "react";

const ConfirmLogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white  p-8 shadow-lg max-w-xl w-1/3 ">
        <h2 className="text-lg font-semibold mb-5">Confirm Logout</h2>
        <p className="text-neutral-500 font-medium m-1 mb-8">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-between space-x-4">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-primary  hover:bg-red-600">
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
