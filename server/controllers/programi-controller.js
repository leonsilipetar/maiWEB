const Program = require("../model/Program.js");

// Create a new Program
exports.createProgram = async (req, res) => {
    const { naziv, kategorija, opis, mentori, slika } = req.body;
  
    try {
      const newProgram = new Program({ naziv, kategorija, opis, mentori, slika });
      await newProgram.save();
      res.status(201).json(newProgram);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all Programi
  // In programi-controller.js

exports.getAllProgrami = async (req, res) => {
  const kategorijaId = req.query.kategorija; // Get the category ID from query parameters

  try {
    let query = {};

    // If a category ID is provided, filter programs by that category
    if (kategorijaId) {
      query.kategorija = kategorijaId;
    }

    const programi = await Program.find(query).populate('kategorija', 'naziv');
    res.status(200).json(programi);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

  
  // Get a single Program by id
  exports.getProgramById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const program = await Program.findById(id);
      res.status(200).json(program);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  // Update a Program by id
  exports.updateProgram = async (req, res) => {
    const { id } = req.params;
    const { naziv, kategorija, opis, mentori, slika } = req.body;
  
    try {
      const updatedProgram = await Program.findByIdAndUpdate(id, { naziv, kategorija, opis, mentori, slika }, { new: true });
      res.status(200).json(updatedProgram);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a Program by id
  exports.deleteProgram = async (req, res) => {
    const { id } = req.params;
  
    try {
      await Program.findByIdAndRemove(id);
      res.status(200).json({ message: 'Program deleted successfully.' });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  