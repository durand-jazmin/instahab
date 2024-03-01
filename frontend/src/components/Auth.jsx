import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import HomePage from "../pages/HomePage";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const { user } = useContext(AuthContext);
<<<<<<< HEAD
 
=======

>>>>>>> 22268522bbb5f61fd1c1eb07596ca8cc2bc48da5

  return user ? (
    <div>
      <HomePage />
    </div>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default Auth;
