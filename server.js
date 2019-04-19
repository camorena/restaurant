// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var db = require("./database.js");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

// Basic route that sends the user home page
app.get("/", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "reservation.html"));
});

app.get("/tables", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "table.html"));
});

// clear all tables
app.delete("/api/tables#", function(req, res) {
  return res.json(tables);
});

// List all tables
app.get("/api/tables", function(req, res) {
  db.getTables(function(data) {
    return res.json(data);
  });
});

// Displays a single table, or returns false
app.get("/api/waitlist", function(req, res) {
  db.getWaitlist(function(data) {
    return res.json(data);
  });
});

app.post("/tables", function(req, res) {
  db.addReservation(req.body, function(data) {
    return res.json(data);
  });
});

// Create New tables - takes in JSON input
app.post("/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newtable = req.body;
  res.json(newtable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
