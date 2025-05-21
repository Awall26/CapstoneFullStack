import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useFetchSingleProductQuery, useAddToCartMutation } from "../api/API";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "./UserSlice";

const SingleProduct = () => {
  const { product_id } = useParams();
  const { data, isLoading, isError } = useFetchSingleProductQuery(product_id);
  const [addToCart] = useAddToCartMutation();
  const userToken = useSelector(getToken);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!data) return;

    try {
      await addToCart({ product_id: data.id });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  if (isLoading) {
    return (
      <section>
        <h2>Loading...</h2>
      </section>
    );
  }
  if (isError) {
    return (
      <section>
        <h2>Please try again</h2>
      </section>
    );
  }
  return (
    <section className="single-product-card accent-border green-glow-bottom">
      <img className="product-image" src={data.img_url} alt={data.name} />
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <p>${data.price}</p>
      <div className="single-product-buttons">
        <button onClick={() => navigate("/")}>Back</button>
        {userToken ? (
          <button onClick={handleAddToCart}>Add to Cart</button>
        ) : (
          <button>
            <Link to="/api/login">Login to add to cart</Link>
          </button>
        )}
      </div>
      {showMessage && <div className="success-message">Added to cart!</div>}
    </section>
  );
};

export default SingleProduct;
