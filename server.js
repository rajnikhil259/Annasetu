require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/db');  // PostgreSQL config

const authRoutes = require('./routes/auth');
const donorRoutes = require('./routes/donor');
const receiverRoutes = require('./routes/receiver');

const app = express();
const PORT = process.env.PORT || 8000;

// Set EJS and static folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Routes
app.use('/', authRoutes);
app.use('/donor', donorRoutes);
app.use('/receiver', receiverRoutes);

// Health Route
app.get('/', (req, res) => {
  res.send('Food Donation Platform is Running ✅');
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
