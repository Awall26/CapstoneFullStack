import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Cart from "./components/Cart";
import { getToken, logout } from "./components/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import Register from "./components/Register";
import Users from "./components/Users";
import Confirmation from "./components/Confirmation";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const token = useSelector(getToken);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div>
      <header className="green-glow-bottom">
        <h1 className="green-glow-text">GAMESBOI</h1>
        <Navigation
          token={token}
          onLogout={handleLogout}
          onCartToggle={handleCartToggle}
        />
      </header>

      <section>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route
            path="api/products/:product_id"
            element={<SingleProduct token={token} />}
          />
          <Route
            path="/api/login"
            element={<Login data={data} setData={setData} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </section>
      {token &&
        location.pathname !== "/confirmation" &&
        location.pathname !== "/" && (
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        )}
    </div>
  );
}

export default App;
