"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/product";

export default function ProductCard({ product }: { product: Product }) {
  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return url.startsWith("http://") || url.startsWith("https://");
    } catch {
      return false;
    }
  };

  const price = product.price ?? 0;

  return (
    <div>
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-48">
          {isValidImageUrl(product.imageUrl) ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="object-cover w-full h-full rounded-md"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 rounded-md">
              <p>No image available</p>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
      </Link>
      <p className="text-gray-500 mt-1">${price.toFixed(2)}</p>
    </div>
  );
}
