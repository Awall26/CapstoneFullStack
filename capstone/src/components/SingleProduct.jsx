import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useFetchSingleProductQuery } from "../api/API";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "./UserSlice";

const SingleProduct = ({ token }) => {
  const { product_id } = useParams();
  const { data, isLoading, isError } = useFetchSingleProductQuery(product_id);
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = () => {
    console.log("Adding to cart:", data);
    dispatch(addToCart(data));
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
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
  console.log(data);
  return (
    <section className="single-product-card">
      <img className="product-image" src={data.img_url} alt={data.name} />
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <p>{data.price}</p>
      <button>
        <Link to="/">Back</Link>
      </button>
      {token ? (
        <button onClick={handleAddToCart}>Add to Cart</button>
      ) : (
        <button>
          <Link to="/api/login">Login to add to cart</Link>
        </button>
      )}
      {showMessage && <div className="success-message">Added to cart!</div>}
    </section>
  );
};

export default SingleProduct;
