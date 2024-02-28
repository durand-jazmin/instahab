import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { deleteReelService } from "../services";
import { AuthContext } from "../context/AuthContext";
import LikeButton from "./Like";
import "./Reel.css";

const base_URL = "http://localhost:3000";

const Reel = ({ user, reel, removeReel }) => {
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
     
  <div className="user-info">
        <img src={`https://source.unsplash.com/random/30x30?sig=${reel.user_id}`} alt="User Profile"/>
<<<<<<< HEAD
      <div className="user-email">Usuario: {reel.email}</div>
=======
      <div className="user-email">{reel.email}</div>
>>>>>>> d5add22228ceffde77da4c53a61c0e8e3793dd2b
      <LikeButton reel={reel} user={user}/>
        <button onClick={() => {if (window.confirm("Do you want to delete this reel?")) deleteReel(reel.id);}}>Delete reel</button>
  </div>
    <div className="reel-content"> 
        {reel.image && ( <img src={`${base_URL}/uploads/${reel.image}`} alt={reel.text} /> )}
<<<<<<< HEAD
        <p>Comment: {reel.text}</p>
=======
        <p>{reel.text}</p>
>>>>>>> d5add22228ceffde77da4c53a61c0e8e3793dd2b
      <div className="nav"><Link to={`/reel/${reel.id}`}>Created at: {new Date(reel.created_at).toLocaleDateString()}</Link></div>  
         {error && <p>Error: {error}</p>}
    </div>
  </article>
  );
};

export default Reel;