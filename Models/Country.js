const mongoose = require("mongoose");

// Define schema for countries collection
const countrySchema = new mongoose.Schema({
  country: String,
  capital: String,
  flag: String,
});
const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
