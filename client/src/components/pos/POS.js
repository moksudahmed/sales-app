import React, { useState } from 'react';
import style from './styles/POS.module.css';
import Receipt from './Receipt';
import Payment from './Payment';
import Cart from './Cart';
import Controls from './Controls';
import SelectItem from './SelectItem';
import ProductList from './ProductList';
import Header from './Header';

const POS = ({ products, onAddSale, onUpdateStock }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cashGiven, setCashGiven] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [orderDetails, setOrderDetails] = useState({
    guestCount: 1,
    diningType: 'Dine-In',
  });

  const handleRemoveItem = (productId) => {
    const itemToRemove = cart.find(item => item.product_id === productId);
    if (itemToRemove) {
      setCart(prevCart => prevCart.filter(item => item.product_id !== productId));
      onUpdateStock(itemToRemove.product, itemToRemove.quantity); // Optionally update stock when an item is removed
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCart(prevCart => prevCart.map(item => 
      item.product_id === productId
        ? { ...item, quantity: newQuantity, total: newQuantity * item.total_price }
        : item
    ));
  };

  const handleUpdateDiscount = (productId, discount) => {
    setCart(prevCart => prevCart.map(item => 
      item.product_id === productId
        ? { ...item, discount: discount, total: (item.total_price * (1 - item.discount / 100)).toFixed(2) }
        : item
    ));
  };

  const handleTotalDiscountChange = (event) => {
    const discountValue = parseInt(event.target.value, 10) || 0;
    setDiscount(discountValue);
  };

  const handleCompleteOrder = (event) => {
    event.preventDefault();
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.total_price * (1 - item.discount / 100),
      0
    );
    if (paymentMethod === 'cash') {
      const change = cashGiven - totalAmount;
      if (change < 0) {
        alert('Insufficient cash given!');
        return;
      }
    }
    onAddSale({ user_id: 1, total: totalAmount, sale_products: cart, discount:discount });
    setCart([]);
    setPaymentMethod('cash');
    setCashGiven(0);
    setCardNumber('');
    setDiscount(0);
    Receipt({ cart });
  };

  const handleNoSale = () => {
    setCart([]);
  };

  const handleDiningTypeChange = (type) => {
    setOrderDetails((prevState) => ({
      ...prevState,
      diningType: type,
    }));
  };

  const handleGuestCountChange = (count) => {
    setOrderDetails((prevState) => ({
      ...prevState,
      guestCount: count,
    }));
  };
  
  const totalAmountBeforeDiscount = cart.reduce(
    (sum, item) => sum + item.total_price * (1 - item.discount / 100),
    0
  );
  
  const totalDiscount = (totalAmountBeforeDiscount * discount) / 100;
  
  const totalAmount = (totalAmountBeforeDiscount - totalDiscount);
  

  
  return (
    <div className={style.posContainer}>
      <div className={style.orderSection}>
        {/*<Header  orderDetails={orderDetails}/> */}
        <SelectItem
          products={products}
          selectedProduct={selectedProduct}
          quantity={quantity}
          setSelectedProduct={setSelectedProduct}
          cart={cart}
          setCart={setCart}
          onUpdateStock={onUpdateStock}
          setQuantity={setQuantity}
        />
        <Cart cart={cart} handleRemoveItem={handleRemoveItem} handleUpdateQuantity={handleUpdateQuantity} handleUpdateDiscount={handleUpdateDiscount} />
        <div className={style.orderSummary}>
            {/* Part 1: Discounts and Credits */}
            <div className={style.summaryLeft}>
              <div className={style.summaryItem}>
                <span>Credits:</span>
                <span>$0.00</span>
              </div>
              <div className={style.summaryItem}>
                <span>Balance Due:</span>
                <span>$0.00</span>
              </div>
             {/* <div className={style.summaryItem}>
                <span>Itemwise Discounts:</span>
                <span>
                  $
                  {cart
                    .reduce(
                      (sum, item) => sum + item.total_price * (item.discount / 100),
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>*/}
              
            </div>

            {/* Part 2: Subtotal, Tax, and Balance Due */}
            <div className={style.summaryRight}>
            <div className={style.summaryItem}>
                <span>Total Discounts:</span>
                <span>
                  <input
                    type="number"
                    value={discount}
                    min="0"
                    className={style.quantityInput}
                    onChange={handleTotalDiscountChange}
                  />
                </span>
              </div>
              <div className={style.summaryItem}>
                <span>:</span>
                <span>-${totalDiscount.toFixed(2)}</span>
              </div>
              <div className={style.summaryItem}>
                <span>Subtotal:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className={style.summaryItem}>
                <span>Tax:</span>
                <span>$0.00</span>
              </div>
              
              <div className={style.total}>
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

        <Payment
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          setCashGiven={setCashGiven}
          setCardNumber={setCardNumber}
          cashGiven={cashGiven}
          cardNumber={cardNumber}
        />
        <div className={style.paymentSection}>
          <button
            className={style.payButton}
            onClick={() => handleGuestCountChange(1)}
          >
            1 Guest
          </button>
          <button
            className={style.payButton}
            onClick={() => handleDiningTypeChange('Dine-In')}
          >
            Dining
          </button>
          <button className={style.payButton} onClick={handleNoSale}>
            No Sale
          </button>
          <button className={style.payButton} onClick={handleNoSale}>
            Hold
          </button>
          <button className={style.payButton} onClick={handleNoSale}>
            Split
          </button>
          
          <button className={style.payButton} onClick={handleNoSale}>
            Cancel
          </button>
          <button
            className={style.payButton}
            onClick={handleCompleteOrder}
          >
            Pay (${totalAmount.toFixed(2)})
          </button>
        </div>
      </div>
      <ProductList
        products={products}
        cart={cart}
        setCart={setCart}
        onUpdateStock={onUpdateStock}
        quantity={quantity}
        discount={discount}
        handleUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
};

export default POS;
