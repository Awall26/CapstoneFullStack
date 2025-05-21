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

  const [createUser, { isLoading, isError }] = useCreateUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isError) {
    return <div>Hmmm... something went wrong</div>;
  } else if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createUser(formData);
      if (result.data) {
        dispatch(setToken(result.data.token));
        dispatch(
          setUser({
            user: result.data.user,
            isLoggedIn: true,
            is_admin: result.data.user.is_admin,
            token: result.data.token,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

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
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span>Login Here</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
