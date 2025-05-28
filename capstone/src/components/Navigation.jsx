import { Link, useNavigate } from "react-router-dom";
import { useFetchUserCartQuery } from "../api/API";

const Navigation = ({ token, onLogout, onCartToggle }) => {
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
        <Link to="/">Home</Link>
        {token ? (
          <>
            <button onClick={onCartToggle} className="nav-link cart-toggle">
              Cart ({totalItems})
            </button>
            <button onClick={handleLogout} className="auth-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/api/login" className="auth-button">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
