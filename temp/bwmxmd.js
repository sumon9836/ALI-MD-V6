const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

// Ensure temp directory exists
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

// Import routes
const qr = require('./qr');
const code = require('./pair');

// Prevent max listeners warning
require('events').EventEmitter.defaultMaxListeners = 500;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/qr', qr);
app.use('/code', code);
app.use('/pair', (req, res) => {
    res.sendFile(path.join(__dirname, '/pair.html'));
});
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
Bwm XMD scanner online ✅

Made by Ibrahim Adams

Server running on http://0.0.0.0:${PORT}
    `);
});

// Export the app instance
module.exports = app;
