import { useState } from "react";
import { Product } from "../types/product";

export default function ProductForm({ onSubmit }: { onSubmit: (product: Product) => void }) {
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: null,
    category: "",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" ? (value === "" ? null : parseFloat(value)) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product);
    setProduct({
      id: "",
      name: "",
      description: "",
      price: null,
      category: "",
      imageUrl: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        className="border p-2 rounded w-full outline-none"
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        className="border p-2 rounded w-full outline-none"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price ?? ""}  // Convert `null` to an empty string
        onChange={handleChange}
        className="border p-2 rounded w-full outline-none"
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        className="border p-2 rounded w-full outline-none"
        required
      />
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={product.imageUrl}
        onChange={handleChange}
        className="border p-2 rounded w-full outline-none"
        required
      />
      <button type="submit" className="btn btn-primary">
        Save Product
      </button>
    </form>
  );
}
