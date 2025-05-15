import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
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
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const token = useSelector(getToken);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <header>
        <h1>GAMESBOI</h1>
        <Navigation token={token} onLogout={handleLogout} />
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
          <Route
            path="/cart"
            element={<Cart data={data} setData={setData} token={token} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
