const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.mongodb || 'mongodb://localhost:27017/notes-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/notes', require('./routes/note'));
app.use('/api/auth', require('./routes/auth'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});