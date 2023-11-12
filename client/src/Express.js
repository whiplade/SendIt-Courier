const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Your routes and other middleware go here

const PORT = 5555;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
