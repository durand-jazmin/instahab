import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import useReels from "../hooks/useReels";
import ErrorMessage from "../components/ErrorMessage";
import UserReels from "../components/UserReels";
import Loading from "../components/Loading";
import { AuthContext } from "../context/AuthContext";
import NewReel from "../components/NewReel";
import "./UserPage.css";

const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);
  const { user: currentUser } = React.useContext(AuthContext);
  const { reels, addReel, removeReel } = useReels();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="gridContainer">
      <div className="linkHome">
        <Link to="/"> <i class="material-icons">home</i> </Link>
      </div>
      <div className="profileHeader">
        <img
          className="avatar"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          alt={`Avatar${user.id}`}
        />
        <h1>Profile:</h1>
        <p className="email">Email: {user.email}</p>
        <p className="id">Id: {user.id}</p>
        <p className="registered">
          Registered on: {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>

      {currentUser && currentUser.id === user.id && (
        <div className="reelsPage">
          <NewReel addReel={addReel} />
          <UserReels id={user.id} />
        </div>
      )}
    </div>
  );
};

export default UserPage;