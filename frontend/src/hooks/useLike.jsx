import React, { useState, useContext,useEffect } from 'react';
import { AuthContext } from "../context/AuthContext";
import { likeReelService } from '../services';

const useLike = (id) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token} = useContext(AuthContext);


  const handleLike = async (reelId) => {
    try {
      setLoading(true);
      await likeReelService(reelId,token);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { error, loading, handleLike };
};
export default useLike;
