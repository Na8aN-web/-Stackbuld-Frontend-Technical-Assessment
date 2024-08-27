"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Product } from "../../../../types/product";
import { getProducts, updateProduct } from "../../../../utils/localStorageUtils";
import Notification from "@/components/Notification";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const products = getProducts();
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "price") {
      setProduct(prevProduct => ({
        ...prevProduct!,
        [name]: value.trim() === "" ? null : parseFloat(value)
      }));
    } else {
      setProduct(prevProduct => ({
        ...prevProduct!,
        [name]: value
      }));
    }
  };

  const handleUpdateProduct = () => {
    if (product) {
      if (
        !product.name.trim() ||
        !product.description.trim() ||
        product.price === null || 
        product.price <= 0 ||
        !product.category.trim() ||
        !product.imageUrl.trim()
      ) {
        setNotification("Please fill out all fields correctly.");
        return;
      }

      const updatedProduct = { ...product, category: product.category.trim().toLowerCase() };
      updateProduct(updatedProduct);
      setNotification("Product updated successfully!");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 font-poppins">Edit Product</h1>
      <div className="flex flex-col gap-2">
        <input
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleInputChange}
          required
          className="border p-2 outline-none"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleInputChange}
          required
          className="border p-2 outline-none"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price !== null ? product.price.toString() : ''}
          onChange={handleInputChange}
          required
          className="border p-2 outline-none"
        />
        <input
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleInputChange}
          required
          className="border p-2 outline-none"
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={product.imageUrl}
          onChange={handleInputChange}
          required
          className="border p-2 outline-none"
        />
        <button
          onClick={handleUpdateProduct}
          className="bg-yellow-500 text-white p-2 mt-4"
        >
          Update Product
        </button>
      </div>

      {notification && (
        <Notification message={notification} onClose={handleCloseNotification} />
      )}
    </div>
  );
}
