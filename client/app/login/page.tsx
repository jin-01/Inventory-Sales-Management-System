"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link"; 
import styles from "./style.module.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location.href = "/"; 
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className={styles.input}
          />
          {error && <div className={styles.errorMsg}>{error}</div>}
          <button type="submit" className={styles.button}>Sign In</button>
        </form>
        <p className={styles.registerText}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
