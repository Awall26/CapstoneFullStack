import {
  useFetchProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
} from "../api/API";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAdmin } from "./UserSlice";
import { useState } from "react";

const Products = () => {
  const { data, isLoading, isError } = useFetchProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [editProduct] = useEditProductMutation();
  const isAdmin = useSelector(getIsAdmin);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    img_url: "",
  });
  const navigate = useNavigate();

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({ name: "", description: "", price: "", img_url: "" });
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...editingProduct,
        id: editingProduct.id,
      };
      await editProduct({
        product_id: editingProduct.id,
        productData: updatedProduct,
      });
      setEditingProduct(null);
    } catch (error) {
      console.error("Failed to edit product:", error);
    }
  };

  if (isLoading)
    return (
      <section className="loading-section">
        <h1 className="loading-message">Grabbing games for you</h1>
      </section>
    );

  if (isError)
    return (
      <section className="loading-section">
        <h1 className="loading-message">Oops! Game Over!</h1>
      </section>
    );

  return (
    <>
      {isAdmin ? (
        <div className="admin-section accent-border green-glow-bottom">
          <h2>Admin Controls</h2>
          <button
            className="admin-nav-button"
            onClick={() => navigate("/users")}
          >
            View Users
          </button>
          <h3>Create New Product</h3>
          <form onSubmit={handleCreateProduct} className="create-product-form">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.img_url}
              onChange={(e) =>
                setNewProduct({ ...newProduct, img_url: e.target.value })
              }
              required
            />
            <button type="submit">Create Product</button>
          </form>
        </div>
      ) : null}

      <div className="products-wrapper">
        <h1 className="products-title">Products</h1>
        <section className="products-container">
          {data.map((product) => (
            <div key={product.id} className="product-wrapper">
              <div className="product-card green-glow-bottom  accent-border">
                <img
                  className="product-image"
                  src={product.img_url}
                  alt={product.name}
                />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <button
                    className="details-button"
                    onClick={() => navigate(`/api/products/${product.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
              {isAdmin && (
                <div className="admin-controls">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>

      {editingProduct ? (
        <div className="edit-modal">
          <form onSubmit={handleEditProduct} className="edit-product-form">
            <h3>Edit Product</h3>
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                value={editingProduct.name || ""}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={editingProduct.description || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                value={editingProduct.price || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                value={editingProduct.img_url || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    img_url: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="edit-buttons">
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditingProduct(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default Products;
