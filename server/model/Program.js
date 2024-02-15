const mongoose = require('mongoose');

const programiSchema = new mongoose.Schema({
  naziv: { type: String, required: true }, // Program name
  kategorija: { type: mongoose.Schema.Types.ObjectId, ref: 'Kategorija', required: true }, // Reference to its category
  opis: { type: String, required: true }, // Description
  cijena: { type: String, required: true }, // Cijena
  mentori: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }], // References to mentors
  slika: { type: String, required: true } // Image URL
});

const Program = mongoose.model('Program', programiSchema);
module.exports = Program;
