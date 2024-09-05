import React from 'react';
import Stock from '../components/pos/Stock';

const StockPage = ({ products, onUpdateStock }) => {
  return (
    <div>
      <h1>Stock Page</h1>
      <Stock products={products} onUpdateStock={onUpdateStock} />
    </div>
  );
};

export default StockPage;
