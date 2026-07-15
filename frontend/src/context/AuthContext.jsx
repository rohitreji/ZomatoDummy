import { createContext, useState, useEffect } from 'react';
import { login as apiLogin, signup as apiSignup } from '../services/api';

export const AuthContext = createContext();

const AUTH_STORAGE_KEY = 'zomato_auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed.user);
        setToken(parsed.token);
      } catch (e) {
        console.error('Failed to parse auth storage', e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await apiLogin({ email, password });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
      return data.user;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const data = await apiSignup({ name, email, password });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
      return data.user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
