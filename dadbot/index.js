require('dotenv').config(); // IGNORE IF NOT USING .ENV FILE

const https = require('https')
const BootBot = require('bootbot');
const fetch = require('node-fetch');
const GIPHY_URL = process.env.giphyAPI // FILL IN WITH UR INFO
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

bot.hear('joke', (payload, chat) => {
  console.log('message received')
  https.get(options, (res) => {
    res.on('data', (d) => {
      chat.say(d.toString('utf8'));
    });
  }).on('error', (e) => {
    console.error(e);
  });
});

bot.hear(/gif (.*)/i, (payload, chat, data) => {
  const query = data.match[1]; // this gets the word after gif in the facebook message, and is explained in the bootbot documentation and uses regular expression (regex) patterns
  console.log('user asked for: ', query);
  fetch(GIPHY_URL + query)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      chat.say({
        attachment: 'image',
        url: json.data[0].images.fixed_height.url
      })
    })
})


bot.start();
