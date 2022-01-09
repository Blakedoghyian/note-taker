// require express and instantiate server
const express = require('express');
const app = express();

// listen for requests
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});