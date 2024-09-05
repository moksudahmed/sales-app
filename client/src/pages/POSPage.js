import React from 'react';
import POS from '../components/pos/POS';

const POSPage = ({ products, onAddSale, onUpdateStock }) => {
  return (
    <div>
      
      <POS products={products} onAddSale={onAddSale} onUpdateStock={onUpdateStock} />
    </div>
  );
};

export default POSPage;
