import React, { useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

const useLikes = (reelId, initialLikes) => {
  const { token, user, likes, totalLikes, toggleLike, toggleDislike, updateTotalLikes } = useContext(AuthContext);

  async function handleLike() {
    try {
      console.log('authToken:', token);
      const response = await fetch(`http://localhost:3000/reels/${reelId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          value: 1,
        }),
      });

      if (response.ok) {
        toggleLike(reelId);
      } else {
        console.error('Error al dar like:', response.statusText);
      }
    } catch (error) {
      console.error('Error al dar like:', error.message);
    }
  }

  return { likes, handleLike };
};

export default useLikes;
