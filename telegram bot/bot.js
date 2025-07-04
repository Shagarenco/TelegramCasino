const { Telegraf } = require('telegraf');

const BOT_TOKEN = '8039985234:AAFS71MqF_uKrJtw-GZ_khArbU9ACMP8VTc';

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.replyWithHTML(
    'Welcome to the Telegram Casino! 🎰',
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Open Casino App',
              web_app: { url: 'https://telegram-casino-system-aho7-git-main-shagarencos-projects.vercel.app' }
            }
          ]
        ]
      }
    }
  );
});

bot.launch();

console.log('Bot is running...');