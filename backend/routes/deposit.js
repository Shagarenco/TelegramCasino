// backend/routes/deposit.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const referralService = require('../services/referralService');

router.post('/:telegramId', async (req, res) => {
  try {
    const amount = parseFloat(req.body.amount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    let user = await User.findOne({ telegramId: req.params.telegramId });
    if (!user) {
      user = new User({ telegramId: req.params.telegramId });
    }

    user.balance += amount;
    await user.save();

    // Wenn es sich um eine erste Einzahlung handelt, prüfe auf Referal
    if (user.balance === amount && user.referralId && user.referralId !== req.params.telegramId) {
      await referralService.processReferral(user.referralId, user.telegramId);
    }

    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;