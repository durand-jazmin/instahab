import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';


export const LikeComponent = ({ reelId }) => {
  const { token, user,likes, toggleLike } = useContext(AuthContext);
  const [likesCount, setLikesCount] = useState(0);
  const { login } = useContext(AuthContext);
  const [showWarning, setShowWarning] = useState(false);

  const handleLike = () => {
    if (!token) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    const newLikes = likes[reelId] === 1 ? 0 : 1;
    
    toggleLike(reelId, newLikes); 
  };
  const isLiked = likes[reelId] === 1;

  const handleIncrement = () => {
    if (login) {
      setLikesCount(prevLikes => prevLikes + 1);
    } else {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    }
  };

  const handleDecrement = () => {
    if (login) {
      setLikesCount(prevLikes => prevLikes - 1);
    } else {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    }
  };

  return (
     <div>
    <span className="material-icons" id="like"  onClick={handleLike} style={{ color: isLiked ? 'red' : 'lightgrey' }}><span >favorite</span></span>
  {showWarning && <p style={{ color: "orange" }}>You are not logged in. Your like may not be saved.</p>}
</div>
  );
};

export const TotalLikes = () => {
  const totalLikes= Object.values(likes).reduce((total, like) => total + like, 0);

  return (
    <div>
      <p className='totalLikes'>Total Likes: {totalLikes}</p>
    </div>
  );
};
