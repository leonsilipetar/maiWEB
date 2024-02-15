const mongoose = require('mongoose');

const mentoriSchema = new mongoose.Schema({
  ime: { type: String, required: true }, // First name
  prezime: { type: String, required: true }, // Last name
  opis: { type: String, required: true }, // Description
  kategorije: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Kategorija' }], // Categories they teach
  programi: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }], // Programs they teach
  slika: { type: String, required: true } // Image URL
});

const Mentor = mongoose.model('Mentor', mentoriSchema);
module.exports = Mentor;
