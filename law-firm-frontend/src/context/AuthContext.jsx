import React from "react";
import { createContext, useState, useEffect } from "react";
import {
  login,
  register,
  logout,
  getUserProfile,
  getCurrentUser,
} from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (getCurrentUser()) {
          const result = await getUserProfile();
          if (result.success) {
            setUser(result.user);
          } else {
            throw new Error(result.error);
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await login(email, password);
      if (result.success) {
        setUser(result.user);
        return result.user;
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await register(userData);
      if (result.success) {
        setUser(result.user);
        return result.user;
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    isAuthenticated: !!user,
    isClient: user?.role === "client",
    isLawyer: user?.role === "lawyer",
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
