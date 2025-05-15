import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation, useFetchUserCartQuery } from "../api/API";
import { setToken, setUser } from "./UserSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Login = ({ data, setData }) => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { refetch: refetchCart } = useFetchUserCartQuery();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      const result = await login(data);
      if (result.data) {
        dispatch(setToken(result.data.token));
        dispatch(
          setUser({
            id: result.data.user.id,
            username: result.data.user.username,
            name: result.data.user.name,
            mailing_address: result.data.user.mailing_address,
            isLoggedIn: true,
            is_admin: result.data.user.is_admin,
          })
        );
        await refetchCart();
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid username or password. Please try again.");
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-wrapper">
      <div className="login-inner">
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
              className="login-input"
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
              className="login-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <button className="submit login-info" type="submit">
              Login
            </button>
          </div>
          <p>
            Don't have an account?{" "}
            <Link to="/register">
              <span>Register Here</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
