import useReels from '../hooks/useReels';
import ErrorMessage from './ErrorMessage';
import ReelList from './ReelList';

const UserReels = ({ id }) => {
  const { reels, loading, error, removeReel } = useReels(id);

  if (loading) return <p>Loading reels...</p>;
  if (error) return <ErrorMessage message={error} />;

  return <ReelList reels={reels} removeReel={removeReel} />;
};

export default UserReels;