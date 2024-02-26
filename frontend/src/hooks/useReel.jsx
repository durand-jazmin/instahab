import { useEffect, useState } from 'react';
import { getSingleReelService } from '../services';

const useReel = (id) => {
  const [reel, setReel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReel = async () => {
      try {
        setLoading(true);
        const data = await getSingleReelService(id);

        setReel(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadReel();
  }, [id]);

  return { reel, error, loading };
};

export default useReel;
