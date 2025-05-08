import { useFetchProductsQuery } from "../api/API";
import { Link } from "react-router-dom";

const Products = () => {
  const { data, isLoading, isError } = useFetchProductsQuery();

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
