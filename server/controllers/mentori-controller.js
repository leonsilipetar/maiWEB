const Mentor = require("../model/Mentor.js");

// Create a new Mentor
exports.createMentor = async (req, res) => {
    const { ime, prezime, opis, kategorije, programi, slika } = req.body;
  
    try {
      const newMentor = new Mentor({ ime, prezime, opis, kategorije, programi, slika });
      await newMentor.save();
      res.status(201).json(newMentor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Get all Mentori
  exports.getAllMentori = async (req, res) => {
    try {
      const mentori = await Mentor.find();
      res.status(200).json(mentori);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  // Get a single Mentor by id
  exports.getMentorById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const mentor = await Mentor.findById(id);
      res.status(200).json(mentor);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  // Update a Mentor by id
  exports.updateMentor = async (req, res) => {
    const { id } = req.params;
    const { ime, prezime, opis, kategorije, programi, slika } = req.body;
  
    try {
      const updatedMentor = await Mentor.findByIdAndUpdate(id, { ime, prezime, opis, kategorije, programi, slika }, { new: true });
      res.status(200).json(updatedMentor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a Mentor by id
  exports.deleteMentor = async (req, res) => {
    const { id } = req.params;
  
    try {
      await Mentor.findByIdAndRemove(id);
      res.status(200).json({ message: 'Mentor deleted successfully.' });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  