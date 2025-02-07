import React from "react";

const ConfirmationDelete = ({ onCancel, onConfirm,  message }) => {
  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white  p-8 shadow-lg max-w-xl w-1/3 ">
        <h2 className="text-lg font-semibold mb-5">Confirm Deletion</h2>
        <p className=" text-neutral-500 font-medium m-1 mb-8"> {message}</p>
        <div className="flex justify-between mt-4">
          <button className="btn-primary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn-secondary hover:bg-red-500"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDelete;
