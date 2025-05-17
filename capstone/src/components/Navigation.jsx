import { Link, useNavigate } from "react-router-dom";
import { useFetchUserCartQuery } from "../api/API";

const Navigation = ({ token, onLogout }) => {
  const navigate = useNavigate();
  const { data: cart = [] } = useFetchUserCartQuery();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/");
  };

  return (
    <nav className="navigation">
      <div className="nav-links">
        <Link className="green-glow-text" to="/">
          Home
        </Link>
        {token ? (
          <>
            <Link className="nav-link green-glow-text" to="/cart">
              Cart ({totalItems})
            </Link>
            <button
              onClick={handleLogout}
              className="auth-button green-glow-text"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/api/login" className="auth-button green-glow-text">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
