const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mernapp', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));

// Define a simple model
const Item = mongoose.model('Item', new mongoose.Schema({
   name: String,
}));

// API Routes
app.get('/api/items', async (req, res) => {
   const items = await Item.find();
   res.json(items);
});

app.post('/api/items', async (req, res) => {
   const newItem = new Item(req.body);
   await newItem.save();
   res.json(newItem);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
