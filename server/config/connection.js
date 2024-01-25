// Import mongoose module
const mongoose = require('mongoose');

// If running on Render/Netlify, connect to MongoDB via process.env.MONGODB_URI
// If running on localhost, connect to MongoDB via 'mongodb://127.0.0.1:27017/progressPilotDB'
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/progressPilotDB');

module.exports = mongoose.connection;