import React from "react";

const SubmitButton = ({ isSubmitting }) => {
  return (
    <button
      type="submit"
      className="w-full py-2 border text-white border-green-600 flex items-center justify-center"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
          Signing Up...
        </>
      ) : (
        "Sign Up"
      )}
    </button>
  );
};

export default SubmitButton;
