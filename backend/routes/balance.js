const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Guthaben abfragen
router.get('/:telegramId', async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.params.telegramId });
    if (!user) {
      return res.status(404).json({ message: 'Nutzer nicht gefunden' });
    }
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

module.exports = router;