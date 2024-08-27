
import { Product } from "../types/product";

export const getProducts = (): Product[] => {
  const storedProducts = localStorage.getItem("products");
  return storedProducts ? JSON.parse(storedProducts) : [];
};

const saveProducts = (products: Product[]) => {
  localStorage.setItem("products", JSON.stringify(products));
};

export const getCategoriesFromStorage = (): string[] => {
  const storedCategories = localStorage.getItem("categories");
  return storedCategories ? JSON.parse(storedCategories) : [];
};

const saveCategoriesToStorage = (categories: string[]) => {
  localStorage.setItem("categories", JSON.stringify(categories));
};


const normalizeCategory = (category: string): string => category.trim().toLowerCase();

export const addProduct = (product: Product) => {
  const products = getProducts();
  products.push(product);
  saveProducts(products);

  const categories = getCategoriesFromStorage();
  const normalizedCategory = normalizeCategory(product.category);
  if (!categories.includes(normalizedCategory)) {
    categories.push(normalizedCategory);
    saveCategoriesToStorage(categories);
  }
};

export const updateProduct = (updatedProduct: Product) => {
  const products = getProducts();
  const productIndex = products.findIndex((p) => p.id === updatedProduct.id);
  if (productIndex !== -1) {
    products[productIndex] = updatedProduct;
    saveProducts(products);

    const categories = getCategoriesFromStorage();
    const normalizedCategory = normalizeCategory(updatedProduct.category);
    if (!categories.includes(normalizedCategory)) {
      categories.push(normalizedCategory);
      saveCategoriesToStorage(categories);
    }
  }
};

export const deleteProduct = (productId: string) => {
  const products = getProducts();
  const updatedProducts = products.filter((product) => product.id !== productId);
  saveProducts(updatedProducts);
};
