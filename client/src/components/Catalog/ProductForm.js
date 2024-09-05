import React, { useState } from 'react';
import styles from './styles/ProductForm.module.css';

const ProductForm = ({ onAddProduct }) => {
  const [title, setTitle] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      title,
      unitPrice: parseFloat(unitPrice),
      stock: parseInt(stock, 10),
    };
    onAddProduct(newProduct);
    setTitle('');
    setUnitPrice('');
    setStock('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.productForm}>
      <div className={styles.inputGroup}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Unit Price:</label>
        <input
          type="number"
          step="0.01"
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Stock:</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
