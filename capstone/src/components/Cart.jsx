import React from "react";
import { useFetchUserCartQuery } from "../api/API";
import { skipToken } from "@reduxjs/toolkit/query";
const Cart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, isLoading, isError } = useFetchUserCartQuery(
    user?.id && user?.token
      ? { user_id: user.id, token: user.token }
      : skipToken
  );
  // const { data, isLoading, isError } = useFetchUserCartQuery();
  // const {userData} = useFetchUsersQuery();

  if (isLoading) {
    return (
      <section>
        <h2>Loading your cart...</h2>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <h2>Error loading cart. Please try again.</h2>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section>
        <h2>Your cart is empty</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>Your Cart</h2>
      <div className="cart-items">
        {data.map((product) => (
          <div key={product.id} className="cart-item">
            <img src={product.img_url} alt={product.name} />
            <div className="item-details">
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cart;
