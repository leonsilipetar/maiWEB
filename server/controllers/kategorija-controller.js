const Kategorija = require("../model/Kategorija.js");

// Create a new Kategorija
exports.createKategorija = async (req, res) => {
    const { naziv, opis, slika } = req.body;
  
    try {
      const newKategorija = new Kategorija({ naziv, opis, slika });
      await newKategorija.save();
      res.status(201).json(newKategorija);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all Kategorije
  exports.getAllKategorije = async (req, res) => {
    try {
      const kategorije = await Kategorija.find();
      res.status(200).json(kategorije);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  // Get a single Kategorija by id
  exports.getKategorijaById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const kategorija = await Kategorija.findById(id);
      res.status(200).json(kategorija);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  // Update a Kategorija by id
  exports.updateKategorija = async (req, res) => {
    const { id } = req.params;
    const { naziv, opis, slika } = req.body;
  
    try {
      const updatedKategorija = await Kategorija.findByIdAndUpdate(id, { naziv, opis, slika }, { new: true });
      res.status(200).json(updatedKategorija);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a Kategorija by id
  exports.deleteKategorija = async (req, res) => {
    const { id } = req.params;
  
    try {
      await Kategorija.findByIdAndRemove(id);
      res.status(200).json({ message: 'Kategorija deleted successfully.' });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  