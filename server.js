// require express and instantiate server
const express = require('express');
const app = express();
const path = require('path');

// use heroku served port
const PORT = process.env.PORT || 3001;


// route to serve index.html page
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


// listen for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});