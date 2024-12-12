import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Logout = () => {
  const location = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    location("/login");
  };

  return (
      <button
        onClick={handleLogout}
        className="flex items-center p-2 text-white-900 hover:text-white hover:bg-red-700 group bg-red-300 rounded-md font-medium"
      >
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
        <span className="ms-3">Logout</span>
      </button>
  );
};

export default Logout;
