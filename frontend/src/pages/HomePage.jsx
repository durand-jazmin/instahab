import React, { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import useReels from "../hooks/useReels";
import ReelList from "../components/ReelList";
import ErrorMessage from "../components/ErrorMessage";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { reels, error, loading, reel, removeReel } = useReels();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="home-page-container">
       {user ? (
        <> 
          <div className="left-column">
         <img
<<<<<<< HEAD
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVbi1SFIb9MQDGjq6xHhu7Qs41_H3FKRpLUvBH3kcgcw&s"
=======
        src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png"
>>>>>>> d5add22228ceffde77da4c53a61c0e8e3793dd2b
        alt="Instagram Logo"
        className="instagram-logo"
      />
          <Link to={`/user/${user.id}`}> <img className="avatar"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              alt="Avatar"/></Link>
        </div>
        
        <div className="center-column">
          <ReelList reels={reels} removeReel={removeReel} />
        </div>

        <div className="right-column">
           <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default HomePage;