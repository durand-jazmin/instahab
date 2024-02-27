import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import './Like.css'

const base_URL = "http://localhost:3000";

const LikeButton = ({ isLiked,setIsLiked}) => {

  const { token} = useContext(AuthContext);
  const [error, setError] = useState("");

  const toggleLike = async () => {
    try {
      const response = await fetch(`${base_URL}/like`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ reel }) 
      });
      if (response.ok) {
        setIsLiked(!isLiked);
      }else{
        throw new Error('Error al registrar el like');
      }
    }catch(error){
      setError(error.message);
    }
  };
  return (
    <motion.button 
    onClick={toggleLike} 
    className={`like-button ${ isLiked ? 'active' : ''}`}
    whileTap={{ scale: 0.9 }}
    >
       <span className="heart"></span>
      {isLiked ? 'Liked' : 'Like'}
      {error && <p className="error-message">{error}</p>}
    </motion.button>
  );
};
export default LikeButton;


