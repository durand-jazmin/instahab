import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { deleteReelService } from "../services";
import { AuthContext } from "../context/AuthContext";
import LikeButton from "./Like";
import "./Reel.css";

const base_URL = "http://localhost:3000";

const Reel = ({ user, reel, removeReel }) => {

  const navigate = useNavigate();

  const { token, like,toggleLike } = useContext(AuthContext);

  const { isAuthenticated } = useContext(AuthContext);

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
     
  <div className="user-info">
        <img src={`https://source.unsplash.com/random/30x30?sig=${reel.user_id}`} alt="User Profile"/>
      <div className="user-email">Usuario: {reel.email}</div>
        <button onClick={() => {if (window.confirm("Do you want to delete this reel?")) deleteReel(reel.id);}}>Delete reel</button>
  </div>
    <div className="reel-content"> 
        {reel.image && ( <img src={`${base_URL}/uploads/${reel.image}`} alt={reel.text} /> )}
        <p>Comment: {reel.text}</p>
      <div className="nav"><Link to={`/reel/${reel.id}`}>Created at: {new Date(reel.created_at).toLocaleDateString()}</Link></div>  
         {error && <p>Error: {error}</p>}
        <p>Total likes: {like}</p> 
        <button onClick={toggleLike}>{like === 1 ? "Unlike" : "Like"}</button>
    </div>
  </article>
  );
};

export default Reel;