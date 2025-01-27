const mongoose = require('mongoose');

// Definizione dello schema User
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Creazione del modello User
const User = mongoose.model('User', UserSchema);

module.exports = User;
