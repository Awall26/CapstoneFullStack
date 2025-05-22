import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCreateUserMutation } from "../api/API";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "./UserSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    mailing_address: "",
  });

  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await createUser(formData);
      console.log("Registration response:", result);

      if (result.error) {
        console.error("Registration error:", result.error);
        if (result.error.data?.message?.includes("duplicate key value")) {
          setError(
            "This username is already taken. Please choose a different one."
          );
        } else {
          setError("Registration failed. Please try again.");
        }
        return;
      }

      if (result.data) {
        const userData = result.data;
        dispatch(setToken(userData.token));
        dispatch(
          setUser({
            id: userData.id,
            username: userData.username,
            name: userData.name,
            mailing_address: userData.mailing_address,
            isLoggedIn: true,
            is_admin: userData.is_admin || false,
          })
        );
        navigate("/api/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mailing Address</label>
          <input
            type="text"
            id="mailing_address"
            name="mailing_address"
            value={formData.mailing_address}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
        <p>
          Already have an account?{" "}
          <Link to="/api/login">
            <span>Login Here</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
