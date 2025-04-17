import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const updateUser = (userData) => {
    setCurrentUser(userData);
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/user`, {
          headers: {
            "x-auth-token": token,
          },
        });
        if (!response.ok) {
          throw new Error("Authentication failed");
        }
        const userData = await response.json();
        setCurrentUser(userData);
      } catch (error) {
        console.error("Error loading user:", error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/signin");
  };

  const value = {
    currentUser,
    loading,
    signOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
