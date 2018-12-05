const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

// Add middleware to tweak express to work as we want to serve a static directory
app.use(express.static(publicPath));

app.listen(port, () => console.log('App running on port', port));
