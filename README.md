# E-Commerce Product Listing Platform

## Overview

The **E-Commerce Product Listing Platform** is a web application built with Next.js and TypeScript for managing and displaying a list of products. The platform allows users to add, edit, delete, and filter products. It uses local storage for data persistence and includes features like category management, price filtering, and user notifications.

## Features

- **Product Management**: Add, edit, and delete products.
- **Category Filtering**: Filter products based on categories.
- **Price Filtering**: Filter products based on price range.
- **Notifications**: Inform users of successful actions (e.g., product added, updated, or deleted).
- **Responsive Design**: Optimized for both mobile and desktop views.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Typed superset of JavaScript for better development experience.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Local Storage**: Client-side storage for persisting data.

## Getting Started

### Prerequisites

- **Node.js**: Version 14 or higher.
- **npm** or **Yarn**: Package managers for installing dependencies.

### Installation

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/e-commerce-product-listing.git
cd e-commerce-product-listing

2. **Install Dependencies**

npm install
# or
yarn install

3 **Run the Development Server**

npm run dev
# or
yarn dev

The application will be accessible at http://localhost:3000.

### Project Structure

/src: Main source code directory.
/app: Contains page components and routes.
/page.tsx: Main listing page where products are displayed.
/products/add/page.tsx: Page for adding a new product.
/products/edit/[id]/page.tsx: Page for editing an existing product.
/components: Reusable components.
Notification.tsx: Component for displaying notifications.
ProductCard.tsx: Displays individual product details.
ProductFilter.tsx: Component for filtering products.
/types: TypeScript type definitions.
product.ts: Type definitions for product data.
/utils: Utility functions.
localStorageUtils.ts: Functions for interacting with local storage (CRUD operations and category management).
/data: Contains dummy data for initial testing (optional).


### Key Components
ProductCard: Displays a single product's information including name, price, and image.
ProductFilter: Provides filtering options for products based on category and price.
Notification: Shows success or error messages to users.
State Management: The application uses React hooks (useState, useEffect) to manage state and side effects. State is managed locally within components, and changes are reflected in the UI.

Local Storage Usage
Products: Stored in local storage under the key "products".
Categories: Stored in local storage under the key "categories".
Data is normalized to ensure consistency. Categories are converted to lowercase to handle case-insensitivity.

Adding or Editing Products
When adding or editing a product:

-All fields are required.
-The category is normalized to lowercase before saving.
-New categories are added to the list of available categories.

Deleting Products
Products can be deleted with a confirmation modal to prevent accidental deletions. Upon deletion, the product is removed from local storage.

Custom Fonts
The application uses the Poppins font. Ensure that the next.config.js is correctly configured to include custom fonts, and update your Tailwind configuration to use these fonts.
