import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { deleteReelService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { LikeComponent } from "./LikeComponent";
import { ConfirmationPopup } from "./ConfirmationPopup";
import "./Reel.css";

const base_URL = "http://localhost:3000";

const Reel = ({ user, reel, removeReel, searchTerm}) => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const deleteReel = async (id) => {
    try {
      await deleteReelService({ id, token });

      if (removeReel) {
        removeReel(id);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteReel = () => {
    setShowConfirmationPopup(true);
  };

  const handleConfirmDelete = () => {
    deleteReel(reel.id);
    setShowConfirmationPopup(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmationPopup(false);
  };
if (
    !searchTerm ||
    reel.text.toLowerCase().includes(searchTerm.toLowerCase())
  ) {
  return (
    <article className="reel">
      <div className="user-info">
        <img src={`https://source.unsplash.com/random/30x30?sig=${reel.user_id}`} alt="User Profile" />
        <div className="user-email">Usuario: {reel.email}</div>
        <button onClick={handleDeleteReel}>Delete reel</button>
          <LikeComponent className="buttonLike" reelId={reel.id}/>
      </div>
      <ConfirmationPopup
        show={showConfirmationPopup}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Reel"
        message="Are you sure you want to delete this reel?"
      />
      <div className="reel-content">
        {reel.image && (
          <img src={`${base_URL}/uploads/${reel.image}`} alt={reel.text} />
        )}
        <p>Comment: {reel.text}</p>
        <div className="nav">
          <Link to={`/reel/${reel.id}`}>
            Created at: {new Date(reel.created_at).toLocaleDateString()}
          </Link>
        </div>
        {error && <p>Error: {error}</p>}
      </div>
    </article>
  );
}else {
    return null;
  }
};

export default Reel;
