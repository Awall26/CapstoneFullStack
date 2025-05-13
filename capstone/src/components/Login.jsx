import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../api/API";
import { setToken } from "./UserSlice";
import { useDispatch } from "react-redux";

const Login = ({ data, setData }) => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(data);
      console.log(result);
      console.log(result.data);
      if (result.data) {
        dispatch(setToken(result.data.token));
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
        <p>
          Don't have an account?{" "}
          <Link to="/register">
            <span>Register Here</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
