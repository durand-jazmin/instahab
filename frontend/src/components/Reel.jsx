import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { deleteReelService } from "../services";
import { AuthContext } from "../context/AuthContext";
import "./Reel.css";
import LikeButton from "./Like";

const base_URL = "http://localhost:3000";

const Reel = ({ reel, removeReel }) => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [error, setError] = useState("");

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

  return (
    <article className="reel">
      <div className="reel-content">
        {reel.image && (
          <img src={`${base_URL}/uploads/${reel.image}`} alt={reel.text} />
        )}
        <p>{reel.text}</p>
      </div>
      <div className="user-info">
        <img
          src={`https://source.unsplash.com/random/30x30?sig=${reel.user_id}`}
          alt="User Profile"
        />
        <span>{reel.email}</span>
        <LikeButton
          reelId={reel.id}
          initialLikes={reel.likes}
          authToken={token}
        />
        <button
          onClick={() => {
            if (window.confirm("Are you sure?")) deleteReel(reel.id);
          }}
        >
          Delete
        </button>
      </div>
      <p>♥️ Likes: {reel.likes}</p>
      <div className="timestamp">
        <Link to={`/reel/${reel.id}`}>
          {new Date(reel.created_at).toLocaleString()}
        </Link>
      </div>
      {error && <p>{error}</p>}
    </article>
  );
};

export default Reel;
