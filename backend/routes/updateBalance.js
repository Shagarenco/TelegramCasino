// backend/routes/updateBalance.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/:telegramId', async (req, res) => {
  try {
    const telegramId = req.params.telegramId;
    const { balance } = req.body;

    if (isNaN(balance)) {
      return res.status(400).json({ success: false, message: 'Invalid balance value.' });
    }

    let user = await User.findOne({ telegramId });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    user.balance = parseFloat(balance);
    await user.save();

    res.json({ success: true, newBalance: user.balance });
  } catch (error) {
    console.error("Error updating balance:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;