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

// save note on left side, with ID
app.post("/api/notes", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    let newNotes = req.body;
    let notesID = (savedNotes.length).toString();
    newNotes.id = notesID;
    savedNotes.push(newNotes);

    fs.writeFileSync("db/db.json", JSON.stringify(savedNotes));
    console.log(`Note saved. ID #${notesID}. Content:`, newNotes);
    res.json(savedNotes);
})

// delete button method
app.delete("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    let notesID = req.params.id;
    console.log(`Note #${notesID} deleted.`);
    savedNotes = savedNotes.filter(currentNote => {
        return currentNote.id != notesID;
    })
    fs.writeFileSync("db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
});


// listen for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});