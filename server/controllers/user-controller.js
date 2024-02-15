const User = require('../model/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const asyncWrapper = require("../middleware/asyncWrapper.js");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const signup = asyncWrapper(async (req, res, next) => {
  const {email} = req.body;

  const existingUser = await User.findOne({ email: email });


if (existingUser) {
    return res.status(400).json({ message: 'Korisnik već postoji!!' });
}
   // Generate a random password with only letters (lowercase and uppercase) and numbers
   const passwordLength = 8; // You can change this to 6 if you prefer
   const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   const randomPassword = Array.from({ length: passwordLength }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
 
   console.log('password: ', randomPassword);

  try {
    const hashPassword = bcrypt.hashSync(randomPassword);

  const user = new User({
    email,
    password: hashPassword,
  });
console.log(req.body)
  await user.save();
    // Send the random password to the user's email
    await sendPasswordEmail(email, randomPassword);

    return res.status(201).json({
      message: 'Uspješno ste registrirali korisnika, lozinka poslana na email.',
    });
  } catch (err) {
    console.error('Error during signup:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



const sendPasswordEmail = async (email, password) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'leonosobni@gmail.com', // replace with your Gmail email
      pass: 'vrsj acql nqyh lnvr', // replace with your Gmail app password
    },
    secureOptions: 'TLSv1_2',
  });

  const mailOptions = {
    from: 'leonosobni@gmail.com', // replace with your Gmail email
    to: email,
    subject: 'Lozinka za admin web stranice | Music Art Incubator',
    text: `Poštovani,
    U nastavku teksta se nalaze podaci za prijavu na admin web stranice Music Art Incubator.
    E-mail adresa: ${email}
    Lozinka: ${password}
    
    Molimo vas da čuvate ove informacije sigurno i ne dijelite lozinku. Ako imate bilo kakvih pitanja ili nedoumica, slobodno se obratite našem "timu" za podršku na leonosobni@gmail.com.
    
    S poštovanjem,
    MAI`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
 
const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found. Sign up!" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email/password!" });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    Object.keys(req.cookies).forEach((cookieName) => {
      res.clearCookie(cookieName);
    });

    res.cookie(String(existingUser._id), token, {
      path: '/',
      httpOnly: true, // Prevents client-side JS from reading the cookie
      secure: process.env.NODE_ENV !== 'development', // Ensures the cookie is sent over HTTPS
      sameSite: 'strict', // Prevents the browser from sending this cookie along with cross-site requests
    });

    return res.status(200).json({ message: "Successfully logged in! :)", user: existingUser, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;

  if (!cookies) {
    return res.status(404).json({ message: "No cookies found" });
  }

  const token = cookies.split("=")[1];

  if (!token) {
    return res.status(404).json({ message: "No token found" });
  }

  jwt.verify(String(token), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    req.id = user.id;
    next();
  });
};

const logout = (req, res, next) => {
  const cookies = req.headers.cookie;

  if (!cookies) {
    return res.status(400).json({ message: "No cookies found" });
  }

  const token = cookies.split("=")[1];

  if (!token) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }

    console.log('Clearing cookie for user:', user.id);
    res.clearCookie(String(user.id), {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax'
    });
    console.log("Korisnik odjevljen")
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

    
  
  async function getUser(req, res, next) {
    const userId = req.id;
    let user;

    try {
        // Try to find the user in the User collection
        user = await User.findById(userId, "-password");

        // If not found in User collection, try to find in Mentor collection
        if (!user) {
            user = await Mentor.findById(userId, "-password");
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!user) {
        return res.status(404).json({ message: "User or Mentor not found" });
    }

    return res.status(200).json({ user });
};
const getAllStudents = async (req, res, next) => {
  try {
    const students = await User.find({}, 'ime prezime'); // Adjust the fields as needed
    res.json({ students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Assuming you have your User and Mentor models properly defined and imported


exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
//exports.refreshToken = refreshToken;
exports.logout = logout;
exports.getAllStudents = getAllStudents;