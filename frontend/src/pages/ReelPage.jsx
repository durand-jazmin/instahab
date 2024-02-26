import { useParams } from 'react-router-dom';
import useReel from '../hooks/useReel';
import Reel from '../components/Reel';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';

const ReelPage = () => {
  const { id } = useParams();
  const { reel, error, loading } = useReel(id);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>Reel</h1>
      <Reel reel={reel} />
    </section>
  );
};

export default ReelPage;