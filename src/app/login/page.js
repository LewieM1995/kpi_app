"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../auth_context/auth_context";
import loginStyles from "./login.module.css";
import { useRouter } from "next/navigation";

const LoginPage = () => {

  const { isAuthenticated, isAdmin, login, logout, isLoading, error } = useAuth();
  const router = useRouter()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(username, password)
  };

  useEffect(() => {
    if (isAuthenticated){
      router.push('/')
    }
  })

  return (
    <div className={loginStyles.container}>
      <form className={loginStyles.form} onSubmit={handleSubmit}>
        <h2 className={LoginPage.title}>Fuji KPI</h2>
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={loginStyles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={loginStyles.input}
          required
        />
        <button type="submit" className={loginStyles.button}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
