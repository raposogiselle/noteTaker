const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const path = require("path");
const uuid = require("uuid");
const { DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");


const app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Setting routes for APIs
//This gets notes saved and joins it in db.json
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"))
});

// Post function to add new notes to db.json
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});

//used for deleting notes
app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
    res.json(delNote);
})


//HTML calls
//calls home page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
//call for notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//Start listen
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});









// Require/import the HTTP module


// Initialize the app and create a port

// Set up body parsing middleware for json and urlencoded
// http://expressjs.com/en/api.html#express
// check out server.js in starwars app

 // serve up the public directory using the static middleware
 // https://expressjs.com/en/starter/static-files.html

// using app.use() for both route files pass in two arguments:
	// the path ('/api' for api routes and '/' for html routes)
	// the routes that you required
// ***Interestingly, the order is very important here as the html routes depend on the api routes to function so apiRoutes must come first.

// Start the server on the port