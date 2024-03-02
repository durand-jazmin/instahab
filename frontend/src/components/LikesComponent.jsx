
import React, {useContext}from 'react';
import { AuthContext } from '../context/AuthContext';
import useLikes from '../hooks/useLikes';
import './LikesComponent.css';


export const LikesComponent = ({reel}) => {
  const { totalLikes } = useContext(AuthContext);
  
  return (
          <p className='totalLikes'>Likes: {totalLikes}</p>   
  );
};

export const LikeButton = ({ reel }) => {
  const { toggleLike } = useContext(AuthContext);

  const handleLikeClick = () => {
    toggleLike(reel.id);
  };
  return (
      <button className="likeButton" onClick={handleLikeClick}>Like</button>
  );
};
