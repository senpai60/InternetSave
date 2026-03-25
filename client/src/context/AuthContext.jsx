import { createContext, useContext, useState } from "react";
import { registerApi, loginApi, verifyUserApi } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    const res = await loginApi(userData);
    setUser(res.data);
  };

  const logout = () => {
    setUser(null);
  };
  const register = async (userData) => {
    const res = await registerApi(userData);
    setUser(res.data);
  };
  const verifyUser = async (userData) => {
    const res = await verifyUserApi(userData);
    console.log(res.data);
    setUser(res.data);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, verifyUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
