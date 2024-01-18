const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Simulated database
const orders = {};

// Endpoint to update order status from the tracking API
app.post('/updateOrderStatus', (req, res) => {
  const { orderId, status } = req.body;

  // Update the order status in the database
  orders[orderId] = status;

  // Send a response to the client
  res.status(200).send('Order status updated successfully!');
});

// Endpoint to get current order status
app.get('/getOrderStatus/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  const status = orders[orderId] || 'Order not found';

  // Send the current order status to the client
  res.status(200).json({ status });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
