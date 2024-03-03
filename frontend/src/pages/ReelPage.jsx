import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; // importa el componente Link
import useReel from '../hooks/useReel';
import Reel from '../components/Reel';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import { useContext } from 'react'; // importa el hook useContext
import { AuthContext } from '../context/AuthContext';
import './ReelPage.css'

const ReelPage = () => {
  const { id } = useParams();
  const { reel, error, loading } = useReel(id);
  const { like, toggleLike } = useContext(AuthContext); // utiliza el hook useContext para acceder al contexto

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <div className="gridContainer">
        <div className="linkHome">
          <Link to="/"> <i className="material-icons">home</i> </Link>
        </div>
        <Reel reel={reel} />
      </div>
    </>
  );
};

export default ReelPage;