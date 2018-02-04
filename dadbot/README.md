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

![Imgur](https://i.imgur.com/a/Q7ugc.png)

- run `npm start`, and send a message to your page! Magic:

![Imgur](https://i.imgur.com/OHWTpZZ.png)

### Step 3: But the Bot Doesn't Say Anything... Yet!

Commit hash:

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
    "text": "hello, world!"
  }
}' "https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>"
```

which is the [official Facebook API](https://developers.facebook.com/docs/messenger-platform/reference/send-api/) method — cURL is a command line tool that allows us access HTTP methods...

we can just write:

```
chat.say('something');
```

which will allow our bot to respond to messages. Awesome.

![Imgur](https://i.imgur.com/eN7DH88.png)

We didn't do much in this step coding-wise, but do try to understand the conceptual background stuff! Yay 4 servers.
