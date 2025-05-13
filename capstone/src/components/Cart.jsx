import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, removeFromCart, updateQuantity } from "./UserSlice";

const Cart = () => {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: parseInt(newQuantity) }));
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, product) => {
        return total + product.price * (product.quantity || 1);
      }, 0)
      .toFixed(2);
  };

  if (!cart || cart.length === 0) {
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
        {cart.map((product) => (
          <div key={product.id} className="cart-item">
            <img
              className="cart-image"
              src={product.img_url}
              alt={product.name}
            />
            <div className="item-details">
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <div className="quantity-selector">
                <label htmlFor={`quantity-${product.id}`}>Quantity: </label>
                <select
                  id={`quantity-${product.id}`}
                  value={product.quantity || 1}
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <p>
                Subtotal: $
                {(product.price * (product.quantity || 1)).toFixed(2)}
              </p>
              <button
                onClick={() => handleRemoveFromCart(product.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Total: ${calculateTotal()}</h3>
      </div>
    </section>
  );
};

export default Cart;
