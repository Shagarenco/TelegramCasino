const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:telegramId', async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.params.telegramId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      telegramId: user.telegramId,
      balance: user.balance,
      referralId: user.referralId,
      earnings: user.referralEarnings
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;