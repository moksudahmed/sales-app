import React, { useState } from 'react';
import styles from './styles/Sales.module.css';
import { FaEdit, FaTrashAlt, FaPrint } from 'react-icons/fa';  // FontAwesome Icons

const Sales = ({ sales = [], products, onUpdateSale, onDeleteSale, onPrintSale }) => {
  const [editingSaleId, setEditingSaleId] = useState(null);
  const [editedItems, setEditedItems] = useState([]);
  const [filters, setFilters] = useState({
    id: '',
    totalMin: '',
    totalMax: '',
    productId: '',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const salesPerPage = 20;
  // New state to manage the list of sales
  const [allSales, setAllSales] = useState(sales);

  const handleEditClick = (sale) => {
    setEditingSaleId(sale.id);
    setEditedItems(sale.sale_products.map((item) => ({
      ...item,
      total_price: item.quantity * (products.find(p => p.id === item.product_id)?.unit_price || 0)
    })));
  };

  const handleDeleteClick = (sale) => {
    if (typeof onDeleteSale === 'function') {
      onDeleteSale(sale.id);
    } else {
      console.error('onDeleteSale is not a function');
    }
  };

  const handlePrintClick = (sale) => {
    if (typeof onPrintSale === 'function') {
      onPrintSale(sale);
    } else {
      console.error('onPrintSale is not a function');
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = editedItems.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );

    // Recalculate total for the updated item
    const updatedItem = updatedItems[index];
    const product = products.find(p => p.id === updatedItem.product_id);
    const unitPrice = product ? product.unit_price : 0;
    updatedItem.total_price = updatedItem.quantity * unitPrice;

    setEditedItems(updatedItems);
  };

  const handleSaveClick = async () => {
    const updatedTotal = editedItems.reduce((sum, item) => sum + item.total_price, 0);

    const updatedSale = {
      ...editingSale,
      sale_products: editedItems,
      total: updatedTotal,
    };

    try {
      if (typeof onUpdateSale === 'function') {
        await onUpdateSale(updatedSale);
        
        // Update local state after successfully updating the sale in the database
        setAllSales(prevSales => prevSales.map(sale => 
          sale.id === updatedSale.id ? updatedSale : sale
        ));
      } else {
        console.error('onUpdateSale is not a function');
      }
    } catch (error) {
      console.error('Error updating sale:', error);
    }

    setEditingSaleId(null);
    setEditedItems([]);
  };

  // The rest of the component remains the same...

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    // Reset pagination when filters change
    setCurrentPage(1);
  };

  const filteredSales = sales.filter((sale) => {
    const matchesId = filters.id ? sale.id.toString().includes(filters.id) : true;
    const matchesTotalMin = filters.totalMin ? sale.total >= parseFloat(filters.totalMin) : true;
    const matchesTotalMax = filters.totalMax ? sale.total <= parseFloat(filters.totalMax) : true;
    const matchesProductId = filters.productId
      ? sale.sale_products.some((item) => item.product_id.toString().includes(filters.productId))
      : true;
    return matchesId && matchesTotalMin && matchesTotalMax && matchesProductId;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredSales.length / salesPerPage);
  const currentSales = filteredSales.slice(
    (currentPage - 1) * salesPerPage,
    currentPage * salesPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const editingSale = sales.find((sale) => sale.id === editingSaleId);

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.salesContainer}>
      <h2 className={styles.title}>Sales</h2>

      {/* Filter Section */}
      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            name="id"
            placeholder="Filter by ID"
            value={filters.id}
            onChange={handleFilterChange}
            className={styles.filterInput}
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="totalMin">Total Min</label>
          <input
            type="number"
            name="totalMin"
            placeholder="Min Total"
            value={filters.totalMin}
            onChange={handleFilterChange}
            className={styles.filterInput}
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="totalMax">Total Max</label>
          <input
            type="number"
            name="totalMax"
            placeholder="Max Total"
            value={filters.totalMax}
            onChange={handleFilterChange}
            className={styles.filterInput}
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="productId">Product ID</label>
          <input
            type="text"
            name="productId"
            placeholder="Filter by Product ID"
            value={filters.productId}
            onChange={handleFilterChange}
            className={styles.filterInput}
          />
        </div>
      </div>

      {/* Sales Table */}
      <table className={styles.salesTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Items</th>
            <th></th>
            <th></th>
            <th>Total</th>
            <th></th>
            <th></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentSales.length > 0 ? (
            currentSales.map((sale) => (
              <tr key={sale.id} className={styles.salesRow}>
                <td>{sale.id}</td>
                <td>
                  {sale.sale_products.map((item) => (
                    <div key={item.id} className={styles.itemDetails}>
                      {item.product_id} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td></td>
                <td></td>
                <td>${sale.total ? sale.total.toFixed(2) : '0.00'}</td>
                <td></td>
                <td></td>
                <td>
                  <button
                    className={styles.iconButton}
                    onClick={() => handleEditClick(sale)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className={styles.iconButton}
                    onClick={() => handlePrintClick(sale)}
                  >
                    <FaPrint /> Print
                  </button>
                  <button
                    className={styles.iconButton}
                    onClick={() => handleDeleteClick(sale)}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={styles.noSales}>No sales available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ''}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {editingSale && (
        <div className={styles.editModal} onClick={() => setEditingSaleId(null)}>
          <div className={styles.modalContent} onClick={handleModalClick}>
            <h3>Edit Sale #{editingSale.id}</h3>
            <table className={styles.editTable}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {editedItems.map((item, index) => {
                  const product = products.find(p => p.id === item.product_id);
                  const productName = product ? product.title : 'Unknown Product';
                  const unitPrice = product ? product.unit_price : 0;

                  const handleQuantityChange = (e) => {
                    const newQuantity = Number(e.target.value);
                    handleItemChange(index, 'quantity', newQuantity);
                  };

                  return (
                    <tr key={item.id}>
                      <td>{productName}</td>
                      <td>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={handleQuantityChange}
                          min="1"
                          className={styles.quantityInput}
                        />
                      </td>
                      <td>${unitPrice.toFixed(2)}</td>
                      <td>${(item.quantity * unitPrice).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.modalActions}>
              <button className={styles.saveButton} onClick={handleSaveClick}>
                Save
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setEditingSaleId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;
