import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/sign-in" className="text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
