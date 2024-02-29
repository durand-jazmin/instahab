import { createContext, useEffect, useState } from 'react';
import { getMyDataService } from '../services/index';

export const AuthContext = createContext(null);

export const AuthContextProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState({});
  const [totalLikes, setTotalLikes] = useState(0);



  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getMyDataService(token);
        console.log(data);

        setUser(data);
      } catch (error) {
        setToken('');
        setUser(null);
      }
    };

    if (token) getUserData();
  }, [token, setToken]);

  useEffect(() => {
    const calculateTotalLikes = () => {
      let total = 0;
      for (const reelId in likes) {
        if (likes[reelId] === 1) {
          total++;
        }
      }
      setTotalLikes(total);
    };

    calculateTotalLikes();
  }, [likes]);

  const logout = () => {
    setToken('');
    setUser(null);
  };

  const login = (newToken) => {
    if (newToken !== token) {
    setToken(newToken);
    }
  };

  const toggleLike = (reelId) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [reelId]: prevLikes[reelId] === 1 ? 0 : 1
    }));
  };

  const toggleDislike = (reelId) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [reelId]: prevLikes[reelId] === -1 ? 0 : -1
    }));
  };


  return (
    <AuthContext.Provider value={{ token, user,likes, totalLikes,toggleLike,toggleDislike, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

