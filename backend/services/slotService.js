// backend/services/slotService.js

function randomResult() {
  const symbols = ['🍒', '🍋', '🍊', '🍇', '💎'];
  var symbolIndex = Math.floor(Math.random() * symbols.length);
  var resultSymbol = [symbols[symbolIndex]];

  var winAmount = 0;
  if (Math.random() > 0.8) {
    winAmount = 2;
  }

  return {
    result: resultSymbol,
    winAmount: winAmount
  };
}

module.exports = {
  playSlot: function(telegramId) {
    return randomResult();
  }
};
if (require.main === module) {
  console.log(randomResult());
}