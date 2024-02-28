import React from 'react';
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