import React from "react";

const SubmitButton = ({ isSubmitting, className, message }) => {
  return (
    <button type="submit" className={className} disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
          {message}
        </>
      ) : (
        message
      )}
    </button>
  );
};

export default SubmitButton;
