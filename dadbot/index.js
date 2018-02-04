require('dotenv').config(); // IGNORE IF NOT USING .ENV FILE

const https = require('https')

// const BootBot = require('bootbot');
// const bot = new BootBot({
//   accessToken: process.env.accessToken, // FILL IN WITH UR INFO
//   verifyToken: 'super_secure_password', // EXAMPLE PW
//   appSecret: process.env.appSecret // FILL IN WITH UR INFO
// })

// bot.on('message', (payload, chat) => {
//   console.log('message received')
//   chat.say('hey!!!');
// });
//
// bot.start();

const options = {
  host: 'icanhazdadjoke.com',
  path: '/',
  headers: { 'Accept': 'text/plain'}
}

https.get(options, (res) => {
  res.on('data', (d) => {
    console.log(d.toString('utf8'));
  });
}).on('error', (e) => {
  console.error(e);
});
