const mongoose = require('mongoose');

// Connection URI
const uri = `${process.env.MONOGDB_URL}/pms`;

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Once the connection is open, you can start using your models
db.once('open', () => {
    console.log('Connected to the database');
    // Your application logic here
});