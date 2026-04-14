import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Authentication = ({ isAuthenticated, redirect, children }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirect} replace={true} />;
  }

  return children ? children : <Outlet />;
};

export default Authentication;
