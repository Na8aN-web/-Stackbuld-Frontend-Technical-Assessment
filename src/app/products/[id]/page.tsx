"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "../../../types/product";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return; 
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const products = JSON.parse(storedProducts) as Product[];
      const product = products.find((p) => p.id === id);
      setProduct(product || null);
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="my-12">{product.description}</p>
      <p className="text-lg font-semibold">${product.price}</p>
      <img src={product.imageUrl} alt={product.name} className="w-full h-auto" />
    </div>
  );
}
