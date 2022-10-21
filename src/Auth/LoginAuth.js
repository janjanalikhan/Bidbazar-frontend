import React, { useState, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuth from "../components/hooks/useAuth";

const LoginAuth = () => {
  const { auth } = useAuth();

  const location = useLocation();

  return auth?.Role ? (
    auth.Role == "Seller" ? (
      <Navigate to="/seller/dashboard" replace />
    ) :
    auth.Role == "Buyer" ? (
      <Navigate to="/buyer/live-auction" replace />
    ) :  (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  ) : (
    <Outlet />
  );
};

export default LoginAuth;
