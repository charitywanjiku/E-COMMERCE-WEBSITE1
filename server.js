const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submissions
app.post('/submit', (req, res) => {
  const formData = req.body;
  console.log('Form submitted:', formData);
  res.send('Form submitted successfully!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
