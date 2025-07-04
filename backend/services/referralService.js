// backend/services/referralService.js

const User = require('../models/User');

async function processReferral(inviterTelegramId, invitedTelegramId) {
  const inviter = await User.findOne({ telegramId: inviterTelegramId });
  const invited = await User.findOne({ telegramId: invitedTelegramId });

  if (!inviter || !invited) return;

  const commissionRate = 0.1; // 10% Kommission
  const referralEarnings = invited.balance * commissionRate;

  inviter.referralEarnings += referralEarnings;
  await inviter.save();
}