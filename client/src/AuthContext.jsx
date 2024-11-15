/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('user', JSON.stringify({ token }));
    } else {
      localStorage.removeItem('user');
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);