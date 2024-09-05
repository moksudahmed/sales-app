import React, { useState } from 'react';
import style from './styles/POS.module.css';

const CashPayment = ({setCashGiven, cashGiven}) =>{

    const handleCashGivenChange = (event) => {
        setCashGiven(Number(event.target.value));
    };
    return(
        <div className={style.cashSection}>
                <label htmlFor="cashGiven" className={style.cashLabel}>Cash Given</label>
                <input
                  type="number"
                  id="cashGiven"
                  value={cashGiven}
                  onChange={handleCashGivenChange}
                  min="0"
                  className={style.cashInput}
                />
              </div>
    );
}

export default CashPayment;