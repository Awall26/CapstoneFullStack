import { useParams } from "react-router-dom";
import React from "react";
import { useFetchSingleProductQuery } from "../api/API";
import { Link } from "react-router-dom";

const SingleProduct = () => {
  const { product_id } = useParams();
  const { data, isLoading, isError } = useFetchSingleProductQuery(product_id);

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
      <img src={data.img_url} alt={data.name} />
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <p>{data.price}</p>
      <button>
        <Link to="/">Back</Link>
      </button>
      <button>Add to Cart</button>
    </section>
  );
};

export default SingleProduct;
