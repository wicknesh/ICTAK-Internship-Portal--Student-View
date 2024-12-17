const mongoose = require('mongoose');

// Use the correct environment variable (MONGO_URI) from the .env file
mongoose.connect(process.env.mongoDB_URL)
    .then(() => {
        console.log('Database connection established');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

module.exports = mongoose;
