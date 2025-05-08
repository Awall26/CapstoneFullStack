import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/API";

const Login = ({ setToken, data, setData }) => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(data);
      localStorage.setItem("user", JSON.stringify(result));
      console.log(result);
      if (result.data) {
        setToken(result.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
      // [e.target.password]: e.target.value,
    });
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="submit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
