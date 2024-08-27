"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { Product } from "../types/product";
import ProductFilter from "@/components/ProductFilter";
import { getProducts, deleteProduct, getCategoriesFromStorage } from "@/utils/localStorageUtils";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import Notification from "@/components/Notification";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const products = getProducts();
    setProducts(products);
    setFilteredProducts(products);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const categories = getCategoriesFromStorage();
      setCategories(categories);
    }
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, minPrice, maxPrice, products]);

  const filterProducts = () => {
    const filtered = products.filter(product => {
      const isCategoryMatch = selectedCategory === "All" || product.category === selectedCategory;
      const isPriceMatch = 
        (minPrice === '' || (product.price !== null && product.price >= minPrice)) &&
        (maxPrice === '' || (product.price !== null && product.price <= maxPrice));
      return isCategoryMatch && isPriceMatch;
    });
    setFilteredProducts(filtered);
  };

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id);
    setShowModal(true);
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      deleteProduct(productToDelete);
      const updatedProducts = getProducts();
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setNotification("Item successfully deleted");
      setProductToDelete(null);
      setShowModal(false);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const cancelDeleteProduct = () => {
    setProductToDelete(null);
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 font-poppins">E-commerce Product Listing Platform</h1>
      <ProductFilter
        products={products}
        setFilteredProducts={setFilteredProducts}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      <button onClick={() => router.push("/products/add")} className="bg-blue-500 text-white p-2 mt-4">Add New Product</button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="shadow-md p-4 bg-white rounded-md" key={product.id}>
              <ProductCard product={product} />
              <div className="flex justify-between mt-2">
                <button onClick={() => router.push(`/products/edit/${product.id}`)} className="bg-yellow-500 text-white p-2">Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 text-white p-2">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>

      {/* Render the DeleteConfirmModal */}
      {showModal && (
        <DeleteConfirmationModal
          message="Are you sure you want to delete this product?"
          onConfirm={confirmDeleteProduct}
          onCancel={cancelDeleteProduct}
        />
      )}

      {/* Render the Notification */}
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
    </div>
  );
}
