const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

// Inside index.js
const applicationRoutes = require("./routes/applications");
app.use("/api/applications", applicationRoutes);


// Debug log to verify loading
console.log("✅ auth.js loaded");
app.use('/api/auth', authRoutes);
console.log("➡️ Mounting /api/auth route");

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
