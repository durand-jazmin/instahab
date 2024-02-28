<<<<<<< HEAD
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
=======
import React from 'react';
import {Link,useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import useUser from '../hooks/useUser';
import useReels from '../hooks/useReels';
import useReel from '../hooks/useReel';
import ErrorMessage from '../components/ErrorMessage';
import UserReels from '../components/UserReels';
import Loading from '../components/Loading';
import { AuthContext } from '../context/AuthContext';
import NewReel from '../components/NewReel';

>>>>>>> d5add22228ceffde77da4c53a61c0e8e3793dd2b
import "./UserPage.css";

const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);
  const { user: currentUser } = React.useContext(AuthContext);
<<<<<<< HEAD
  const { reels, addReel, removeReel } = useReels();
=======
  const { reels,addReel, removeReel } = useReels();
>>>>>>> d5add22228ceffde77da4c53a61c0e8e3793dd2b

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
<<<<<<< HEAD
    <div className="grid-container">
      <div className="link-home">
        <Link to="/">⌂ Home</Link>
      </div>
      <div className="profile-header">
        <img
          className="avatar"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          alt="Avatar"
        />
        <h1>Profile:</h1>
        <p className="email">Email: {user.email}</p>
        <p className="id">Id: {user.id}</p>
        <p className="registered">
          Registered on: {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>

      {currentUser && currentUser.id === user.id && (
        <div className="reels-page">
          <NewReel addReel={addReel} />
          <UserReels id={user.id} />
        </div>
      )}
    </div>
=======
    <div className="grid-container"> 
      <div className='link-home'><Link to="/">Home</Link></div>
      <div className="profile-header">

      <img className="avatar" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar"/>
      <h1>Profile:</h1>
      <p> Email: {user.email}</p>
      <p>Id: {user.id}</p>
      <p>Registered on: {new Date(user.created_at).toLocaleDateString()}</p>
     
      </div> 
    
      {currentUser && currentUser.id === user.id && (
        <div className='reels-page'>
        <NewReel addReel={addReel} />
        <UserReels id={user.id} />
        </div>
      )} 
        </div>
   
>>>>>>> d5add22228ceffde77da4c53a61c0e8e3793dd2b
  );
};

export default UserPage;