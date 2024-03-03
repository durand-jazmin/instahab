import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
//import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  navigate("/login");

  return (
    <main className="localContainer">
      <div className="firstContent">
        <figure>
          <img src="../images/animal.jpg" alt="Monster" className='img' />
        </figure>
       </div>
       <div className="SeconContent">
          <span className="NotFound">Page Not Found</span>
          <h2>Oh No !! Error 404</h2>
          <Link to="/login">Log in</Link>
        </div>
     
    </main>
  );
};

export default NotFoundPage;
