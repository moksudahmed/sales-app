import React from 'react';
import ManageProducts from '../components/Admin/ManageProducts';
import ManageSales from '../components/Admin/ManageSales';
import ProductCatalogue from '../components/Catalog/ProductCatalogue';
import SalesReport from '../components/Reports/SalesReport';
import StockReport from '../components/Reports/StockReport';
import styles from '../styles/AdminPage.module.css';

const AdminPage = ({ sales, products, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <div className={styles.section}>
        <ManageProducts products={products} onUpdateProduct={onUpdateProduct} onDeleteProduct={onDeleteProduct} />
      </div>
      <div className={styles.section}>
        <ProductCatalogue products={products} onAddProduct={onAddProduct} />
      </div>      
      <div className={styles.section}>
        <ManageSales sales={sales} />
      </div>
      <div className={styles.section}>
        <h2>Reports</h2>
        <div className={styles.reportOptions}>
          <SalesReport sales={sales} />
          <StockReport products={products} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

