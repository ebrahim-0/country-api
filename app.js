const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const Country = require("./Models/Country");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/countries", async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/countries", async (req, res) => {
  const country = new Country({
    country: req.body.country,
    capital: req.body.capital,
    flag: req.body.flag,
  });
  try {
    const newCountry = await country.save();
    res.status(201).json(newCountry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} use http://localhost:${PORT}`)
);
