import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = ({className}) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signin");
    }
  return (
    <button
      onClick={handleLogout}
        className={`px-4 py-2 bg-red-500 text-white rounded-lg w-full hover:bg-red-600 transition duration-300 ${className}`}
    >
      Logout
    </button>
  )
}

export default Logout