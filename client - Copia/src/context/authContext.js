import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("login")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/login", inputs, { withCredentials: true });
    setCurrentUser(res.data);
  };
 
  const logout = async (inputs) => {
    await axios.post("http://localhost:8800/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("login", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};