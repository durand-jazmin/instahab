import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useReels from "../hooks/useReels";
import ReelList from "../components/ReelList";
import ErrorMessage from "../components/ErrorMessage";
import NewReel from "../components/NewReel";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { reels, error, loading, addReel, removeReel } = useReels();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="home-page-container">
      <img
        src="https://i0.wp.com/www.dafontfree.io/wp-content/uploads/2020/12/instagram-old.png?resize=1100%2C750&ssl=1"
        alt="Instagram Logo"
        className="instagram-logo"
      />
      {user ? (
        <>
          <NewReel addReel={addReel} />
          <h1>📷 Latest reels</h1>
          <ReelList reels={reels} removeReel={removeReel} />
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : null}
    </section>
  );
};

export default HomePage;
