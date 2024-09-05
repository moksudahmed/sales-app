const receiptStyles = `
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
      color: #333;
    }
    h2 {
      text-align: center;
      margin-bottom: 15px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 15px;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f0f0f0;
      font-weight: bold;
    }
    p {
      margin: 5px 0;
    }
  </style>
`;

const Receipt = ({ cart }) => {
  const totalAmount = cart.reduce((acc, item) => acc + (item.total * (1 - item.discount / 100)), 0);
  
  const receiptContent = `
    <h2>Receipt</h2>
    <p>Order #185</p>
    <p>Table 5 | Sharon Hansen</p>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Qty</th>
          <th>Each</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${cart.map(item => `
          <tr>
            <td>${item.product}</td>
            <td>${item.quantity}</td>
            <td>$${item.unit_price ? item.unit_price.toFixed(2) : '0.00'}</td>
            <td>$${(item.total * (1 - item.discount / 100)).toFixed(2)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <p><strong>Total Amount: $${totalAmount.toFixed(2)}</strong></p>
  `;

  const receiptWindow = window.open('', '_blank', 'width=400,height=600');
  
  if (receiptWindow) {
    receiptWindow.document.write(receiptStyles + receiptContent);
    receiptWindow.document.close();
    receiptWindow.print();
  } else {
    console.error('Failed to open a new window for printing the receipt.');
  }
};

export default Receipt;
