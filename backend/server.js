// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const authRoutes = require('./routes/auth');

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-production-domain.com'],
  credentials: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ Connected to MongoDB');
  // Remove the problematic index
  try {
    await mongoose.connection.db.collection('users').dropIndex('username_1');
    console.log('Removed username index');
  } catch (error) {
    console.log('No username index to remove, or error removing index:', error.message);
  }
})
.catch(err => {
  console.error('❌ Failed to connect to MongoDB', err);
  process.exit(1);
});

// Database connection error handling
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB');
});

// Database health check route
app.get('/api/health', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.status(200).json({ status: 'OK', message: 'Connected to MongoDB' });
  } else {
    res.status(500).json({ status: 'Error', message: 'Not connected to MongoDB' });
  }
});

// Use auth routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', err);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
