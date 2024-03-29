const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const Country = require("./Models/Country");
const cors = require("cors");
const compression = require("compression");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(compression());

// Enable CORS for all routes
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

// Middleware
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.json({
    message:
      "Countries Api  use /countries to get all countries and to post a new country",
  });
});

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
