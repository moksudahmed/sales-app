import React, { useState } from 'react';
import ProductForm from './ProductForm';
import axios from 'axios';
import styles from './styles/ProductCatalogue.module.css';

const ProductCatalogue = ({ products, onAddProduct }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddProduct = async (product) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/products/', {
        title: product.title,
        unit_price: product.unitPrice,
        stock: product.stock,
        category: product.category, // Add category to the product payload
        sub_category: product.sub_category, // Add category to the product payload
      });
      onAddProduct(response.data);
      setIsAdding(false);
    } catch (error) {
      console.error("Failed to save product:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className={styles.catalogueContainer}>
      <h2 className={styles.title}>Product Catalogue</h2>
      <button className={styles.addButton} onClick={() => setIsAdding(!isAdding)}>
        {isAdding ? 'Cancel' : 'Add New Product'}
      </button>
      {isAdding && <ProductForm onAddProduct={handleAddProduct} />}
      <div className={styles.productList}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <h3>{product.title}</h3>
              <p>Price: {product.unitPrice ? `$${product.unitPrice.toFixed(2)}` : 'N/A'}</p>
              <p>Stock: {product.stock}</p>
              <p>Category: {product.category}</p> {/* Display product category */}
              <p>Sub Category: {product.sub_category}</p> {/* Display product category */}
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductCatalogue;
