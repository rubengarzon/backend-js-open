const express = require("express");
const dotenv = require("dotenv");

// Configuration the .env file
dotenv.config();

// Create the express APP
const app = express();
const port = process.env.PORT || 8000;

// Define the first route of APP
app.get("/", (req, res) => {
  //Send Hello World
  res.send("Welcome to APP Express + TS + Swagger + Mongoose");
});

// Execute APP and listen the port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
