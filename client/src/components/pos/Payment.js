import React, { useState } from 'react';
import style from './styles/POS.module.css';
import CardPayment from './CardPayment';
import CashPayment from './CashPayment';

const Payment = ({paymentMethod,setPaymentMethod, setCashGiven, setCardNumber, cashGiven, cardNumber})=>{

const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
};
    
/*const handleCashGivenChange = (event) => {
        setCashGiven(Number(event.target.value));
};
    
const handleCardNumberChange = (event) => {
        setCardNumber(event.target.value);
};*/
return(
    <div className={style.paymentSection}>
          <h3 className={style.paymentTitle}>Payment</h3>
          <div className={style.paymentMethodContainer}>
            <div className={style.paymentMethod}>
              <label htmlFor="paymentMethod" className={style.paymentLabel}>Payment Method</label>
              <select id="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange} className={style.paymentSelect}>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="credit">Credit</option>
              </select>
            </div>
            {paymentMethod === 'cash' && (              
              <CashPayment setCashGiven={setCashGiven} cashGiven={cashGiven}/>
            )}
            {paymentMethod === 'card' && (
              <CardPayment setCardNumber={setCardNumber} cardNumber={cardNumber}/>
            )}
          </div>
        </div>
);
}

export default Payment;