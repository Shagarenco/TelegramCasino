// backend/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: String,
  balance: { type: Number, default: 0 },
  referralId: { type: String, default: () => Math.random().toString(36).substr(2, 9) }, // Zufälliger Code
  referralEarnings: { type: Number, default: 0 }, // Verdiente Beträge
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);