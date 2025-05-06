import { useState } from "react";
import { useCreateProductMutation } from "../api/API";

const CreateProduct = () => {
  const [createProduct] = useCreateProductMutation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    img_url: "",
    price: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formData);

      setFormData({
        name: "",
        description: "",
        img_url: "",
        price: 0,
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
};

return (
  <div>
    <h1>Create Product</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Image URL"
        value={formData.img_url}
        onChange={(e) => setFormData({ ...formData, img_url: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />
      <button type="submit">Create Product</button>
    </form>
  </div>
);

export default CreateProduct;
