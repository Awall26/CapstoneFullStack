import { useFetchProductsQuery } from "../api/API";
import { useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const { data, isLoading, isError } = useFetchProductsQuery();
  console.log("Product data:", data);

  if (isLoading)
    return (
      <section>
        <h1>Grabbing games for you</h1>
      </section>
    );

  if (isError)
    return (
      <section>
        <h1>Oops! Game Over!</h1>
      </section>
    );

  return (
    <>
      <h1>Products</h1>
      <section className="products-container">
        {data.map((product) => (
          <div key={product.id} className="product-card">
            <img
              className="product-image"
              src={product.img_url}
              alt={product.name}
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              {/* <p>{product.description}</p> */}
              {/* <p>${product.price}</p> */}
              <button className="details-button">
                <Link to={`/api/products/${product.id}`}>View Details</Link>
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
export default Products;
