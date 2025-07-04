// backend/routes/slots.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const slotService = require('../services/slotService');

router.post('/:telegramId/play', async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.params.telegramId });
    if (!user) {
      return res.status(404).json({ message: 'Nutzer nicht gefunden' });
    }

    if (user.balance < 1) {
      return res.status(400).json({ message: 'Nicht genug Guthaben' });
    }

    const { result, winAmount } = slotService.playSlot(req.params.telegramId);
    user.balance -= 1; // Kosten für Spiel
    user.balance += winAmount;

    await user.save();

    res.json({
      result,
      balance: user.balance,
      winAmount
    });
  } catch (error) {
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

module.exports = router;