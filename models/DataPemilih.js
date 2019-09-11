const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  NIK: {
    type: String,
    required: true,
    unique: true
  },
  NKK: {
    type: String,
    required: true
  },
  nama: {
    type: String,
    required: true
  },
  tanggalLahir: {
    type: Date,
    required: true
  }
});

module.exports = DataPemilih = mongoose.model("DataPemilih", Schema);
