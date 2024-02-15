const express = require('express');
const { 
  signup, 
  login, 
  verifyToken, 
  getUser, 
  // refreshToken, 
  logout,
  getAllStudents,
} = require('../controllers/user-controller.js');
const router = express.Router();

const kategorijeController = require('../controllers/kategorija-controller');
const mentoriController = require('../controllers/mentori-controller');
const programiController = require('../controllers/programi-controller');

// User-related routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
// Fetch all students
router.get('/all-admins', verifyToken, getAllStudents);
// router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);

// Kategorije routes
router.post('/kategorije', kategorijeController.createKategorija);
router.get('/kategorije', kategorijeController.getAllKategorije);
router.get('/kategorije/:id', kategorijeController.getKategorijaById);
router.put('/kategorije/:id', kategorijeController.updateKategorija);
router.delete('/kategorije/:id', kategorijeController.deleteKategorija);

// Mentori routes
router.post('/mentori', mentoriController.createMentor);
router.get('/mentori', mentoriController.getAllMentori);
router.get('/mentori/:id', mentoriController.getMentorById);
router.put('/mentori/:id', mentoriController.updateMentor);
router.delete('/mentori/:id', mentoriController.deleteMentor);

// Programi routes
router.post('/programi', programiController.createProgram);
router.get('/programi', programiController.getAllProgrami);
router.get('/programi/:id', programiController.getProgramById);
router.put('/programi/:id', programiController.updateProgram);
router.delete('/programi/:id', programiController.deleteProgram);

module.exports = router;


module.exports = router;
