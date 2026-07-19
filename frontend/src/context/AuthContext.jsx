import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../api/authApi";

export const AuthContext = createContext();

const AUTH_STORAGE_KEY = "zomato_auth";

const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const payload = token.split(".")[1];
    if (!payload) return false;

    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return typeof decoded.exp === "number" ? decoded.exp * 1000 > Date.now() : true;
  } catch (err) {
    console.error("Invalid token format:", err);
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (isTokenValid(parsed.token)) {
          setUser(parsed.user);
          setToken(parsed.token);
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch (err) {
        console.error("Failed to load auth:", err);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await loginUser({ email, password });
    const data = response.data;

    setUser(data.user);
    setToken(data.token);

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        user: data.user,
        token: data.token,
      })
    );

    return data.user;
  };

  const signup = async (name, email, password, role = "customer") => {
    const response = await registerUser({
      name,
      email,
      password,
      role,
    });

    const data = response.data;

    setUser(data.user);
    setToken(data.token);

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        user: data.user,
        token: data.token,
      })
    );

    return data.user;
  };

  const logout = async () => {
    try {
      await logoutUser(token);
    } catch (err) {
      console.error(err);
    }

    setUser(null);
    setToken(null);

    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateUserProfile = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        user: updatedUser,
        token: token,
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        signup,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);