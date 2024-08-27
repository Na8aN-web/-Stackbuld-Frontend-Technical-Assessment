"use client";

import { Dispatch, SetStateAction } from "react";
import { Product } from "@/types/product";

interface ProductFilterProps {
  products: Product[];
  setFilteredProducts: Dispatch<SetStateAction<Product[]>>;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  minPrice: number | '';
  maxPrice: number | '';
  setMinPrice: Dispatch<SetStateAction<number | ''>>;
  setMaxPrice: Dispatch<SetStateAction<number | ''>>;
}

export default function ProductFilter({
  products,
  setFilteredProducts,
  categories,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice
}: ProductFilterProps) {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value === '' ? '' : parseFloat(value));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value === '' ? '' : parseFloat(value));
  };

  const resetPriceFilter = () => {
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold my-4">Filter Products</h2>
      <div className="flex flex-col gap-2">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border p-2 outline-none"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice === '' ? '' : minPrice}
          onChange={handleMinPriceChange}
          className="border p-2 outline-none"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice === '' ? '' : maxPrice}
          onChange={handleMaxPriceChange}
          className="border p-2 outline-none"
        />
        <button
          onClick={resetPriceFilter}
          className="bg-gray-500 text-white p-2 mt-2"
        >
          Reset Price Filter
        </button>
      </div>
    </div>
  );
}
