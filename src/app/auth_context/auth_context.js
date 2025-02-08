
'use client'

import { createContext, useContext, useState, useEffect } from "react";

// Create a context
const AuthContext = createContext();

// Provide context values
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const isAdminValue = localStorage.getItem("isAdmin");

    if (
      auth === "true"
    ) {
      setIsAuthenticated(true);
      setIsAdmin(isAdminValue === "true");
    } else {
      localStorage.removeItem("auth");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("loginTime");
      setIsAuthenticated(false);
      setIsAdmin(false);
    }

  }, []);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_AUTH}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
  
      const data = await response.json();
  
      if (response.ok && data.authenticated) {
        const { isAdmin } = data.responseData;
        localStorage.setItem("auth", "true");
        localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
        localStorage.setItem("loginTime", new Date().getTime().toString()); // Set the login timestamp
        setIsAuthenticated(true);
        setIsAdmin(isAdmin);
        setIsLoading(false);
      } else {
        setError("Invalid username or password");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error logging in, try refreshing the page");
      setIsLoading(false);
    } finally {
      // Clear errors after 4 seconds
      setTimeout(() => {
        setError(null);
      }, 6000);
    }
  };
  

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("isAdmin");
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, login, logout, isLoading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the context
export const useAuth = () => useContext(AuthContext);
