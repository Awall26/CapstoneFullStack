import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Cart from "./components/Cart";

function App() {
  const [state, setState] = useState();
  const [token, setToken] = useState(null);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleLogout = () => {
    setToken(null);
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
          <Route path="/api/products/:product_id" element={<SingleProduct />} />
          <Route
            path="/api/login"
            element={
              <Login data={data} setData={setData} setToken={setToken} />
            }
          />
          <Route
            path="/cart"
            element={
              // isLoggedIn && userId ?
              <Cart data={data} setData={setData} token={token} />
            }
          />
        </Routes>
      </section>
    </div>
  );
}

export default App;
