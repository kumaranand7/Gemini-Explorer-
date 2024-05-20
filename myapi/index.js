// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB using the URL from .env file
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define a schema for passkeyString collection
const passkeySchema = new mongoose.Schema({
  keyValue: String
});

const Passkey = mongoose.model('Passkey', passkeySchema, 'passkeyString'); // 'passkeyString' is the collection name

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Create an API endpoint to fetch all data
app.get('/api/key', async (req, res) => {
  try {
    const items = await Passkey.find({});
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
