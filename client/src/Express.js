const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Handle preflight requests
app.options('*', cors());

// Your routes and other middleware

app.listen(5555, () => {
  console.log('Server is running on port 5555');
});
