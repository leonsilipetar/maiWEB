const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: String,
  email: {
    type: String,
    unique: true,
  },
},
{timestamps: true }
);

module.exports = mongoose.model('User', userSchema);