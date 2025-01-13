import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { registerUser, loginUser } from "../services/authService";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (userData) => {
    try {
      const data = await registerUser(userData);
      handleAuthData(data.token);
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      handleAuthData(data.token);
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  const handleAuthData = async (token) => {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const decoded = jwtDecode(token);
      const response = await api.get("/users/me");
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    delete api.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const decoded = jwtDecode(token);
          const response = await api.get("/users/me");
          setCurrentUser(response.data);
        } catch (error) {
          console.error("Initialization Error:", error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, signup, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
