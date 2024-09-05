import React, { useState } from 'react';
import style from './styles/Stock.module.css';

const Stock = ({ products, onUpdateStock }) => {
  const [stockLevels, setStockLevels] = useState(
    products.reduce((acc, product) => {
      acc[product.title] = '';
      return acc;
    }, {})
  );

  const handleStockChange = (event, productTitle) => {
    setStockLevels((prevLevels) => ({
      ...prevLevels,
      [productTitle]: Number(event.target.value)
    }));
  };

  const handleUpdateStock = (event) => {
    event.preventDefault();
    Object.keys(stockLevels).forEach((productTitle) => {
      const stockToAdd = stockLevels[productTitle];
      if (stockToAdd !== '') {
        onUpdateStock(productTitle, stockToAdd);
      }
    });
    setStockLevels(
      products.reduce((acc, product) => {
        acc[product.title] = '';
        return acc;
      }, {})
    );
  };

  return (
    <div className={style.stockContainer}>
      <h1>Stock Management</h1>
      <form className={style.form} onSubmit={handleUpdateStock}>
        <table className={style.stockTable}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Current Stock</th>
              <th>Stock to Add</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.stock}</td>
                <td>
                  <input
                    type="number"
                    value={stockLevels[product.title] || ''}
                    onChange={(e) => handleStockChange(e, product.title)}
                    min="0"
                    className={style.input}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={style.buttonContainer}>
          <button type="submit" className={style.btn}>Update Stock</button>
          <button type="reset" className={`${style.btn} ${style.cancelBtn}`}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Stock;
