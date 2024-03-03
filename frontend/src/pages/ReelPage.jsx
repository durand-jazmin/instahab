import { useParams } from 'react-router-dom';
import useReel from '../hooks/useReel';
import Reel from '../components/Reel';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import { AuthContext } from '../context/AuthContext';
import './ReelPage.css'

const ReelPage = () => {
  const { id } = useParams();
  const { reel, error, loading } = useReel(id);
  const { like,toggleLike}= AuthContext;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <Reel reel={reel} />
      <h4>Likes:{like}</h4>
      <button type="button" onClick={toggleLike}>{like === 1 ? "Unlike" : "Like"}</button>
      </>
  );
};

export default ReelPage;