import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
    let jobList = localStorage.getItem("jobs");
    if  (jobList.length === 0) {
      localStorage.removeItem("jobs");
    }
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
