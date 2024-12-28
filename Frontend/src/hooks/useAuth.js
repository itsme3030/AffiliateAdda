import { useState } from "react";
import { login, signup } from "../utils/api";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials);
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
    } catch (error) {
      alert("Login failed");
    }
  };

  const handleSignup = async (data) => {
    try {
      const response = await signup(data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
    } catch (error) {
      alert("Signup failed");
    }
  };

  return { user, handleLogin, handleSignup };
};
