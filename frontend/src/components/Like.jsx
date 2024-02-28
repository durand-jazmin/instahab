
import React, {useContext}from 'react';
import { AuthContext } from '../context/AuthContext';
import useLikes from '../hooks/useLikes';

import './Like.css';

const LikeButton = function ({ reelId, initialLikes }) {
  const { likes, handleLike } = useLikes(reelId, initialLikes);

  return (
    <div>
      
      <button onClick={handleLike}>Like</button>
    </div>
  );
};

export default LikeButton;