import { useParams } from 'react-router-dom';
import useReel from '../hooks/useReel';
import Reel from '../components/Reel';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
<<<<<<< HEAD
import './ReelPage.css'
=======
import './ReelPage.css';
import { logInUserService } from '../services';
>>>>>>> d5add22228ceffde77da4c53a61c0e8e3793dd2b

const ReelPage = () => {
  const { id } = useParams();
  const { reel, error, loading } = useReel(id);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
      <Reel reel={reel} />
  );
};

export default ReelPage;