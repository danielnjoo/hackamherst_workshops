## Messenger Bots with nodeJS, 7th February

What you'll build: a Facebook Messenger bot that replies to any message with a 'Dad joke', which according to [Urban Dictionary](https://www.urbandictionary.com/define.php?term=Dad%20Joke) (the authority on such things), can be defined as:
> "An embarassingly bad joke. Often demonstrated during wedding or 18th/21st Birthday Speeches."

Example: https://www.facebook.com/DadBot-288767724972679/

[Slides](https://docs.google.com/presentation/d/1leGidhbIeeUJs-nqbuHD6ZX-_wW6j7HlM9Qm-uWRP_k/edit?usp=sharing)

### 0-60 Real Fast

__Assumes installation of git, nodeJS, and ngrok__
- clone [this repo](https://github.com/danielnjoo/hackamherst_workshops.git), `git clone https://github.com/danielnjoo/hackamherst_workshops.git`
- go into the dadbot folder: `cd dadbot`
- create a Facebook application @ [https://developers.facebook.com/apps/](https://developers.facebook.com/apps/)
- copy (1) __App Secret__, and (2) the __Page Access Token__ from Messenger > Settings > Token Generation, which will require creating a Facebook page, into `index.js` in the bootbot config line starting `const bot = new BootBot({...})`, make sure the keys are enclosed in 's as they are strings!
- run `npm install` to download all the necessary packages
  - comment out the first line if you're not using environmental variables (which would be in an `.env` file)
- start the node server with `npm start`
- run `ngrok http 3000`, and copy the secure url suffixed by /webhook into the Callback URL field, and the Verify Token field will correspond to whatever `verifyToken` you set in the bootbot configs; this will look like [this](https://imgur.com/a/Q7ugc)
- send a message to your Facebook page!

### Step 0: Setting up your environment / app

- install [nodeJS](https://nodejs.org/en/): a JavaScript-based open-source server framework with the largest package ecosystem in the world
  - check it installed properly by running `npm` in your command line
- download [ngrok](https://ngrok.com/download), a program used for HTTP tunneling
  - test by running `ngrok http 3000` in your command line
- create an application on Facebook by going to [https://developers.facebook.com/apps/](https://developers.facebook.com/apps/), and logging in and creating an application
  - select Messenger
  - in the Dashboard, copy your __App Secret__ somewhere, you'll have to verify with your password to get this... this key is called 'App Secret' for a reason, don't let it fall into the wrong hands :) (if your project is valuable) as it'll let people mess with your app
  - in Messenger > Settings, get your __Page Access Token__, which will require creating a page

### Step 1: First steps

Commit hash: a063308714e0ab2bd95af776cb6697ddcf110888

- run `npm init` in your project folder, it's going to ask you to enter lots of information, just leave these blank and hit return/enter on them and on the confirmation
  - what this does is set up your `package.json` file for your project, this file lists all the dependencies of your nodeJS app, and [more](https://docs.npmjs.com/files/package.json)
- create an `index.js` file in your project folder, your project structure should look like this:

```
project
|-- package.json
|-- index.js
```

- add a single print statement to `index.js`: `console.log('Hello World!')`
- replace the scripts on line 6 of `package.json` to:
  - this tells node where to find your file!

```
  "scripts": {
    "start": "node index.js"
  },
```

- run your project with `npm start`
  - you should see 'Hello World!' in your terminal output

### Step 2: Bot Operational

Commit hash: 6c4e8ca5e642036bae991d6da58a7e938b1fce5b

- install the `bootbot` package via npm: `npm install bootbot`
  - npm is the JS equivalent of pip, installing it will create a new folder `node_modules` in your project directory, and a `package-lock.json` file
  - as packages such as `bootbot` have their own dependencies, npm will install them all for you and save details w.r.t. all of these in the package-lock.json file, [more](https://docs.npmjs.com/files/package-lock.json)
- your project structure should now look like this:

```
project
|-- index.js
|-- node_modules
      |-- bootbot
      |-- some other stuff
|-- package.json
|-- package-lock.json
```

- next, we'll add the two keys that we copied from earlier into the bot config settings, in the line starting `const bot = new BootBot({...})`, make sure the keys are enclosed in 's as they are strings!
  - also don't commit and push your project with these keys to a public github repo (heroku is fine), this is bad practice as anybody will be able to see your keys. Instead you can use [environmental variables](https://medium.com/@rafaelvidaurre/managing-environment-variables-in-node-js-2cb45a55195f) stored in an .env file which you can then ask git to ignore; alternatively, they can be passed in from the command line
- back in [https://developers.facebook.com/apps/](https://developers.facebook.com/apps/), go to your app and go to Products > Messenger > Webhooks > __Setup Webhook__
  - make sure you have ngrok running on port 3000: `ngrok http 3000`, it'll look like below, and you'll copy the secure (https) Forwarding URL suffixed with /webhook into the Callback URL field
- then you'll need to __subscribe__ Messenger to your page
- finally, fill in the Verify Token field which will correspond to whatever `verifyToken` you set in the bootbot configs; it should look like this:

![Imgur](https://i.imgur.com/v3UHjkI.png)

- run `npm start`, and send a message to your page! Magic:

![Imgur](https://i.imgur.com/OHWTpZZ.png)

### Step 3: But the Bot Doesn't Say Anything... Yet!

Commit hash: b003d2d136b8e2b79c02af9e49004fbb814570b5

So what have we done so far?
- we set up a nodeJS server and ran it locally
- we connected our server via ngrok to a http address
- we connected our Facebook app (which is subscribed to a page) to this address -> (via ngrok) -> our local server
- and so we were able to detect the message received by the Facebook page, and demonstrated this via the `console.log()`
- cool!!! now let's get our bot to actually say something, here we refer to the [bootbot documentation](https://github.com/Charca/bootbot), which very helpfully tells us all the methods available to us.
  - the beauty of packages and developers is that they abstract away a lot of stuff we'd otherwise have to do:)

For example, instead of writing into our app:

```
curl -X POST -H "Content-Type: application/json" -d '{
  "messaging_type": "<MESSAGING_TYPE>",
  "recipient": {
    "id": "<PSID>"
  },
  "message": {
    "text": "hey!!!"
  }
}' "https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>"
```

which is the [official Facebook API](https://developers.facebook.com/docs/messenger-platform/reference/send-api/) method — cURL is a command line tool that allows us access HTTP methods — but look at how we don't even have to add a recipient id, or PSID, `bootbot` does it all for us, we can just write:

```
chat.say('hey!!!');
```

which will allow our bot to respond to messages. Awesome.

![Imgur](https://i.imgur.com/eN7DH88.png)

We didn't do much in this step coding-wise, but do try to understand the conceptual background stuff! Yay 4 servers.


### Step 4: Some jokes?  Nah some API stuff first

Commit hash: 9d1937225ea326e5fda03fd9ef746073c4d2b99e

- so remember the idea behind the app was to respond to any message with a dadjoke, one way we could implement this is by storing a huge database of such jokes, and when we receive a message, pull one at random and send that to the user; but that'd involve a considerable amount of work.

__enter the API__

- if you've had one ear open around any tech-ish conversation, the term might be both familiar yet totally alien to you. Cool, we'll change that. API stands for application programming __interface__. Note the emphasis on that last word. The best way to conceptualize an API is to think of it as a structured framework for interacting with an application (via API requests)
  - for example, every time you use Google Search, you're actually using Google's API. Behind the scenes, your search query is converted into key words, each of which corresponds to a Google function, e.g. try "define: serendipity", or "tech news site:reddit.com" as searches, Google returns different results based on the way you interacted with it; that's kind of the essence of an API.
  - request + structured API -> predictable results

__back to dadjokes__

- luckily, there's a [dadjoke API](https://icanhazdadjoke.com/api). Cool. How do we use it? Well the website itself has a cURL example, which you can type straight into your terminal, try `curl -H "Accept: text/plain" https://icanhazdadjoke.com/`
  - note that curl defaults to a GET request, so all it's doing is accessing the website (but not via browser), and retrieving the result in `text/plain`

![Imgur](https://i.imgur.com/qi8npmo.png)

- a nice GUI client for testing out API requests is [Postman](https://www.getpostman.com/), but that's beyond the scope of this exercise.
- in npm, we can implement HTTP requests with the npm package [https](https://www.npmjs.com/package/https), which we install via `npm install https`, we then require it at the top of our `index.js` file. We can comment out all our current code in `index.js`, and replace it with the example provided in the https documentation for a GET request:
  - the request is directed towards Google, and the result is the stuff your browser turns into the Google homepage!
(run with `npm start`)

```
const https = require('https');

https.get('https://encrypted.google.com/', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});
```


### Step 5: Onto the good stuff

Commit hash: 5a88f3bff49d2dc674f75f3f779daebc93e2299c

- so let's get those jokes. Again referring to the https documentation (a really important skill you'll have to pick up when there aren't any more tutorials!) we can see that the `https.get()` method takes an `options` object, and a `callback` function. The object basically sets the parameters of our request (as we did via with the hyphens in the cURL request), and the callback lets us use the results of our request because it's executed after the main function is called; it's a little confusing:
  - according to MDN: A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action, [link](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- we our options thus:

```
const options = {
  host: 'icanhazdadjoke.com',
  path: '/',
  headers: { 'Accept': 'text/plain'}
}
```

- and refactor our request to:

```
https.get(options, (res) => {
  res.on('data', (d) => {
    console.log(d);
  });
}).on('error', (e) => {
  console.error(e);
});
```

- try running `npm start` now, what do you get? Something that looks like <Buffer 49 e2 80 99 6d 20 72 65 61 64 69 6e 67 20 61 20 62 6f 6f 6b 20 6f 6e 20 74 68 65 20 68 69 73 74 6f 72 79 20 6f 66 20 67 6c 75 65 20 e2 80 93 20 63 61 ... > ? Oh no. That's not a very funny joke.
- if we Google this problem (another super important developer skill), looking for "why am i receiving a buffer in api request", we come across the [following](https://stackoverflow.com/questions/32217943/not-getting-proper-response-in-node-js-by-using-node-rest-client-middleware), which tells us to refactor how we print `d`, our data.
  - refactor the request to:

```
https.get(options, (res) => {
  res.on('data', (d) => {
    console.log(d.toString('utf8'));
  });
}).on('error', (e) => {
  console.error(e);
});
```

- run `npm start` again. Awesome.

### Step 6: Jokes + Messenger

Commit hash: be3d0e6ce9f7adabfedd208ba9fbe99699feee5e

- so now we're getting the jokes printed back to us in terminal... all we have to do is do this inside the `bot.on('message')` function, and pass our joke to `chat.say()`... try it yourself, if not scroll down:

Your final code should look like:

```
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
```

![Imgur](https://i.imgur.com/92CJSGj.png)

### Step 7: Extension: GIFs? Why not

Commit hash: 42b352a0e6be56e6abbaaca0d1c7811cd83f7e59

The documentation for the bootbot package has a video showing how to implement sending GIFs to the user. This is a fun feature to add; let's try it!

- Let's refactor our code to only send a joke when it hears the word joke, and expecting a user to send a message in the format: "gif ____", we can use ____ to query GIPHY (which has a friendly API) to retrieve a GIF and send it to us. We really flex our bootbot skills here, by simply using the `chat.say()` method with extra options:

```
chat.say({
	attachment: 'video',
	url: 'http://example.com/video.mp4'
});
```

- This is so much slicker than the FB API documentation equivalent.
- First, we need to set up a GIPHY app, and save our API key, we copy this into GIPHY_URL variable, which we use later on... make sure to switch around the &____'s in the key, such that &q is at the end, e.g.:
  - https://api.giphy.com/v1/gifs/search?api_key=__key__&limit=5&offset=0&rating=G&lang=en&q=, and not
  https://api.giphy.com/v1/gifs/search?api_key=__key__&q=&limit=5&offset=0&rating=G&lang=en (the default)
    - this is important, as we later concat our user's query to the end of this URL, and it won't work if &q (the query parameter) isn't at the end, more info on [URL encoding](https://en.wikipedia.org/wiki/Query_string)
- we install the `node-fetch` npm package via `npm install node-fetch`, and require it
- we also use a regular expression ([regex](https://en.wikipedia.org/wiki/Regular_expression), i.e. sophisticated string matching) pattern to  grab the ___ in our "gif ____" query.

Our final code looks like:

```
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
```

  - note the `.then()`, which you'll see a lot of in JavaScript, [more info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then), and the arrow functions `somefun(thing => console.log(thing))`, [more info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

- run with `npm start`, and test it out in Messenger :)

### Step 8: moar extension - possible ideas

- call a weather API, and fetch the weather
- implement [quickReplies](https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies)
  - try the location quickReply
- {your idea} 
