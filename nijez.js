const fs = require('fs');
const TeleBot = require('telebot');
var Inotify = require('inotify').Inotify;
var inotify = new Inotify();

var data = fs.readFileSync ('secrets.json', 'utf8');
token = JSON.parse(data)['telegram_token'];

data = fs.readFileSync('chats.json', 'utf8');
chats = JSON.parse(data)

bot = new TeleBot(token);

bot.on('text', (msg) => {
    if (msg.chat.id in chats)
        msg.reply.text('You must construct additional pylons!');
    else {
        chats[msg.chat.id] = 1;
        fs.writeFileSync('chats.json', JSON.stringify(chats));
        msg.reply.text('We know where your dog goes to school.');
    }
});

path = '/home/yair/w/nijez/volatile/';
blockin = false;
inotify.addWatch({
    path:       path,
    watch_for:  Inotify.IN_CLOSE_WRITE,
    callback:   function (event) {
                    if (blockin) return;
                    blockin = true;
                    data = fs.readFileSync(path + event.name, 'utf8');
                    console.log('Read ' + data + ' from ' + path + event.name);
                    for (chidid in Object.keys(chats)) {
                        chid = Object.keys(chats)[chidid];
                        bot.sendMessage(chid, data);
                        console.log('Sent ' + data + ' to chat id ' + chid);
                    }
                    blockin = false;
                },
});

bot.start();

//bot.sendMessage
