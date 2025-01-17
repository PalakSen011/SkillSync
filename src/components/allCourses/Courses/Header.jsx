import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-xl font-bold mb-5">Add New</div>
      <div className="flex gap-4">
        <button className="btn-primary flex items-end" onClick={handleBack}>
          Back
        </button>
        <button className="btn-secondary flex items-end">Publish</button>
      </div>
    </div>
  );
};

export default Header;
