import React from "react";

import {show,hide} from "../Assets/index"

const TogglePasswordButton = ({ showPassword, onClick, isSubmitting }) => {
  return (
    <button
      type="button"
      className="absolute top-3 right-2"
      onClick={onClick}
      disabled={isSubmitting}
    >
      <img
        src={showPassword ? show : hide}
        alt={showPassword ? "Hide password" : "Show password"}
        className="w-5 h-5"
      />
    </button>
  );
};

export default TogglePasswordButton;
