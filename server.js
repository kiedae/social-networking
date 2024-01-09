// Import required packages and files
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Set up environment variables
const CUSTOM_PORT = process.env.CUSTOM_PORT || 3001; // Change the custom port variable
const app = express();

// Use middleware to parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use custom routes defined in routes.js
app.use(routes);

// Connect to the MongoDB database and start the server
db.once('open', () => {
    app.listen(CUSTOM_PORT, () => { // Update to use the custom port variable
        console.log(`Custom API server running on port ${CUSTOM_PORT}!`); // Update the console log message
    });
});