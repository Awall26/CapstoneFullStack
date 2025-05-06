import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";

function App() {
  return (
    <section>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/api/products/:product_id" element={<SingleProduct />} />
      </Routes>
    </section>
  );
}

export default App;
