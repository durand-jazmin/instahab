import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useReels from "../hooks/useReels";
import ReelList from "../components/ReelList";
import ErrorMessage from "../components/ErrorMessage";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { reels, error, loading, removeReel } = useReels();
  const { user, like, toggleLike, logout } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="home-page-container">
      {user ? (
        <>
          <div className="left-column">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVbi1SFIb9MQDGjq6xHhu7Qs41_H3FKRpLUvBH3kcgcw&s"
              alt="Instagram Logo"
              className="instagram-logo"
            />
            <Link to={`/user/${user.id}`}>
              {" "}
              <img
                className="avatar"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                alt="Avatar"
              />
            </Link>
          </div>

          <div className="center-column">
            <SearchBar />
          </div>

          <div className="right-column">
            <button className="logout-button" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default HomePage;