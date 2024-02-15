const mongoose = require('mongoose');

const kategorijeSchema = new mongoose.Schema({
  naziv: { type: String, required: true }, // Category name
  opis: { type: String, required: true }, // Description
  slika: { type: String, required: true }, // Image URL
  programi: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }], // References to programs
  mentori: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }] // References to mentors
});

const Kategorija = mongoose.model('Kategorija', kategorijeSchema);
module.exports = Kategorija;
