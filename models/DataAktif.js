const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  NIK: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmed: {
    type: Boolean,
    required: true,
    default: false
  },
  hasVote: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = DataAktif = mongoose.model("DataAktif", Schema);
