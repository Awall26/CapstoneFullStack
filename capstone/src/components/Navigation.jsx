import { Link, useNavigate } from "react-router-dom";

const Navigation = ({ token, onLogout }) => {
  const navigate = useNavigate();

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
            <Link to="/cart">Cart</Link>
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
