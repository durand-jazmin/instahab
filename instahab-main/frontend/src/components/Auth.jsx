import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import HomePage from "../pages/HomePage";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const { user } = useContext(AuthContext);
  return user ? (
    <div>
      <HomePage />
    </div>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default Auth;
