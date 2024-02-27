import React from 'react';
import { useParams } from 'react-router-dom';
import useUser from '../hooks/useUser';
import ErrorMessage from '../components/ErrorMessage';
import UserReels from '../components/UserReels';
import Loading from '../components/Loading';
import { AuthContext } from '../context/AuthContext';

const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);
  const { user: currentUser } = React.useContext(AuthContext);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>User {user.email}</h1>
      <section className="user-data">
        <p>User id: {user.id}</p>
        <p>Registered on {new Date(user.created_at).toLocaleString()}</p>
      </section>
      {currentUser && currentUser.id === user.id && (
        <UserReels id={user.id} />
      )}
    </section>
  );
};

export default UserPage;
