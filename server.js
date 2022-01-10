// require express and instantiate server
const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs");


// use heroku served port
const PORT = process.env.PORT || 3001;

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// instruct the server to make these files static resources
app.use(express.static('public'));

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// route to serve index.html page
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


// listen for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});