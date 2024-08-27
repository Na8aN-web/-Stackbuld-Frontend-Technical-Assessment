"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "../../../types/product";
import { addProduct } from "../../../utils/localStorageUtils";
import Notification from "@/components/Notification";
import { v4 as uuidv4 } from "uuid";

export default function AddProductPage() {
  const router = useRouter();
  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: null,
    category: "",
    imageUrl: "",
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" ? parseFloat(value) || null : value
    }));
  };

  const handleAddProduct = () => {
    const { name, description, price, category, imageUrl } = newProduct;

    if (
      !name.trim() ||
      !description.trim() ||
      price === null || price <= 0 ||
      !category.trim() ||
      !imageUrl.trim()
    ) {
      setNotification("Please fill out all fields correctly.");
      return;
    }

    const productToAdd = { ...newProduct, id: uuidv4(), category: category.trim().toLowerCase() };
    addProduct(productToAdd);
    setNotification("Product added successfully!");

    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 font-poppins">Add New Product</h1>
      <div className="flex flex-col gap-2">
        <input
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          required
          className="border p-2 outline-none"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
          required
          className="border p-2 outline-none"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price ?? ""}
          onChange={handleInputChange}
          required
          className="border p-2 outline-none"
        />
        <input
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleInputChange}
          required
          className="border p-2 outline-none"
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={handleInputChange}
          required
          className="border p-2 outline-none"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white p-2 mt-4"
        >
          Add Product
        </button>
      </div>

      {notification && <Notification message={notification} onClose={handleCloseNotification} />}
    </div>
  );
}
