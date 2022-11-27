import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import DataForm from "./DataForm";

const PrivateRoute = ({ ...props }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  return (
    <div>{isLoggedIn === null ? <Navigate to="/" /> : props.children}</div>
  );
};

export default PrivateRoute;
