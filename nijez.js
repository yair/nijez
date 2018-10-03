const fs = require('fs');
const TeleBot = require('telebot');

var data = fs.readFileSync ('secrets.json', 'utf8');
token = JSON.parse(data)['telegram_token'];

bot = new TeleBot(token);
bot.on('text', (msg) => msg.reply.text(msg.text));
bot.start();

//bot.sendMessage
