const express = require('express');
const cors = require('cors');
const app = express();

// Allow requests from 'http://localhost:3000'
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // You may need to set this depending on your use case
}));

// Your routes and server setup here
app.listen(5555, () => {
  console.log('Server is running on port 5555');
});
