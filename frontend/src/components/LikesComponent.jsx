
import React, {useContext}from 'react';
import { AuthContext } from '../context/AuthContext';
import useLikes from '../hooks/useLikes';
import './LikesComponent.css';


const LikesComponent = ({reel}) => {
  const { totalLikes, toggleLike } = useContext(AuthContext);
  
  const handleLikeClick = () => {
    toggleLike(reel.id);
  };

  return (
    <div>
      <p className='totalLikes'>Likes: {totalLikes}</p>
      <button className="like-button" onClick={handleLikeClick}>Like</button>
      </div>
  );
};

export default LikesComponent;