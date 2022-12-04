import React, { useState, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuth from "../components/hooks/useAuth";

const RequireAuth = (props) => {
  const { auth } = useAuth();

  const location = useLocation();

  console.log("PROPS.ROLE: ", props.role, "AUTH: ", auth.Role);

  return auth.Role == props.role ? (
    <Outlet />
  ) : auth.Role == "Seller" ? (
    <Navigate to="/seller/dashboard" replace />
  ) : auth.Role == "Buyer" ? (
    <Navigate to="/buyer/live-auction" replace />
    ) : auth.Role == "Admin" ? (
      <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
//
