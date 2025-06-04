import React from "react";
import {
  useFetchUserCartQuery,
  useRemoveFromCartMutation,
  useChangeQuantityMutation,
  useFetchProductsQuery,
  useClearCartMutation,
} from "../api/API";
import { useNavigate } from "react-router-dom";

const Cart = ({ isOpen, onClose }) => {
  const { data: cart, isLoading: cartLoading } = useFetchUserCartQuery();
  const { data: products, isLoading: productsLoading } =
    useFetchProductsQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [changeQuantity] = useChangeQuantityMutation();
  const [clearCart] = useClearCartMutation();
  const navigate = useNavigate();

  const calculateTotal = () => {
    if (!cart?.length || !products?.length) return "0.00";
    return cart
      .reduce((total, item) => {
        const product = products.find((p) => p.id === item.product_id);
        if (!product) return total;
        return total + product.price * (item.quantity || 1);
      }, 0)
      .toFixed(2);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart({ product_id: productId });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await changeQuantity({
        product_id: productId,
        quantity: parseInt(newQuantity),
      });
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      await clearCart();
      onClose();
      navigate("/confirmation");
    } catch (error) {
      console.error("Failed to checkout:", error);
    }
  };

  return (
    <>
      <div
        className={`cart-backdrop ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />
      <section className={`cart-wrapper ${isOpen ? "open" : ""}`}>
        <button
          className="cart-close-btn"
          onClick={onClose}
          aria-label="Close cart"
        >
          ×
        </button>
        <h1 className="cart-title">Your Cart</h1>
        <div className="cart-items">
          {cartLoading || productsLoading ? (
            <h2>Loading cart...</h2>
          ) : !cart?.length ? (
            <h2>Your cart is empty</h2>
          ) : (
            cart.map((product) => {
              const cartProduct = products?.find(
                (p) => p.id === product.product_id
              );
              if (!cartProduct) return null;

              return (
                <div
                  key={cartProduct.id}
                  className="cart-item accent-border green-glow-bottom"
                >
                  <img
                    className="cart-image"
                    src={cartProduct.img_url}
                    alt={cartProduct.name}
                  />
                  <div className="item-details">
                    <h3>{cartProduct.name}</h3>
                    <p>Price: ${cartProduct.price}</p>
                    <div className="quantity-selector">
                      <label>Quantity: </label>
                      <select
                        value={product.quantity || 1}
                        onChange={(e) =>
                          handleQuantityChange(
                            product.product_id,
                            e.target.value
                          )
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
                      {(cartProduct.price * (product.quantity || 1)).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveFromCart(cartProduct.id)}
                      className="remove-button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {cart?.length > 0 && (
          <div className="cart-total">
            <h3>Total: ${calculateTotal()}</h3>
            <button onClick={handleCheckout} className="checkout-button">
              Checkout
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Cart;
