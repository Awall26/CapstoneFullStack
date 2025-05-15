import React from "react";
import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <div className="confirmation-container">
      <h1>Order Confirmed</h1>
      <p>Thank you for your order!</p>
      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default Confirmation;
