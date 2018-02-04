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


https.get('https://encrypted.google.com/', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});
