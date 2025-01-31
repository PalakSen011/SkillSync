import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publishCourse } from "../../Store/Slice/courseSlice"; // Import the action

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBack = () => {
    navigate("/courses",);
  };

  const handlePublish = () => {
    dispatch(publishCourse()); // Dispatch the publishCourse action
    navigate("/courses", );
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-xl font-bold mb-5">Add New</div>
      <div className="flex gap-4">
        <button className="btn-primary flex items-end" onClick={handleBack}>
          Back
        </button>
        <button
          className="btn-secondary flex items-end"
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default Header;
