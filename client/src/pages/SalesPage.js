import React from 'react';
import Sales from '../components/pos/Sales';

const SalesPage = ({ sales, products, onUpdateSale, onDeleteSale, onPrintSale }) => {
  return (
    <div>
      <h1>Sales Page</h1>
      <Sales sales={sales} products={products} onUpdateSale={onUpdateSale} onDeleteSale={onDeleteSale} onPrintSale={onPrintSale} />
    </div>
  );
};

export default SalesPage;
