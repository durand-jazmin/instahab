import { createContext, useEffect, useState } from 'react';
import { getMyDataService } from '../services/index';

export const AuthContext = createContext(null);

export const AuthContextProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [like, setLike] = useState(0) 

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getMyDataService(token);

        setUser(data);
      } catch (error) {
        setToken('');
        setUser(null);
      }
    };

    if (token) getUserData();
  }, [token, setToken]);

  const logout = () => {
    setToken('');
    setUser(null);
  };

  const login = (newToken) => {
    if (newToken !== token) {
    setToken(newToken);
    }
  };

  const toggleLike= () => {
    setLike(prev => (prev === 1 ? 0 : 1));
};


  return (
    <AuthContext.Provider value={{ token, user,like,toggleLike, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

