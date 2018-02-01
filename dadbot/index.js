require('dotenv').config(); // IGNORE

const BootBot = require('bootbot');
const bot = new BootBot({
  accessToken: process.env.accessToken,
  verifyToken: 'super_secure_password',
  appSecret: process.env.appSecret
})

bot.on('message', (payload, chat) => {
  console.log('message received')
});

bot.start();
