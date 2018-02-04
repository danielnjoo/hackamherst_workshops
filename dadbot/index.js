require('dotenv').config(); // IGNORE IF NOT USING .ENV FILE

const https = require('https')
const BootBot = require('bootbot');
const bot = new BootBot({
  accessToken: process.env.accessToken, // FILL IN WITH UR INFO
  verifyToken: 'super_secure_password', // EXAMPLE PW
  appSecret: process.env.appSecret // FILL IN WITH UR INFO
})

const options = {
  host: 'icanhazdadjoke.com',
  path: '/',
  headers: {
    'Accept': 'text/plain',
    'User-Agent': 'My Facebook Page (https://www.facebook.com/DadBot-288767724972679/)' // this part is optional, but good practice so the owner of the website knows who's sending him requests
  }
}

bot.on('message', (payload, chat) => {
  console.log('message received')
  https.get(options, (res) => {
    res.on('data', (d) => {
      chat.say(d.toString('utf8'));
    });
  }).on('error', (e) => {
    console.error(e);
  });
});

bot.start();
