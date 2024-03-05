import { useEffect, useState } from 'react';
import { getAllReelsService, getUserReelsService } from '../services';

const useReels = (id) => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReels = async () => {
      try {
        setLoading(true);
        const data = id
          ? await getUserReelsService(id)
          : await getAllReelsService();

        setReels(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadReels();
  }, [id]);

  const addReel = (data) => {
    setReels([data, ...reels]);
  };

  const removeReel = (id) => {
    setReels(reels.filter((reel) => reel.id !== id));
  };

  return { reels, error, loading, addReel, removeReel };
};

export default useReels;
