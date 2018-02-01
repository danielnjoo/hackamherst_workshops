## Messenger Bots with nodeJS, 7th February

What you'll build: a Facebook Messenger bot that replies to any message with a 'Dad joke', which according to [Urban Dictionary](https://www.urbandictionary.com/define.php?term=Dad%20Joke) (the authority on such things), can be defined as "An embarassingly bad joke. Often demonstrated during wedding or 18th/21st Birthday Speeches."

Example: https://www.facebook.com/DadBot-288767724972679/

### 0-60 Real Fast

### Step 0: Setting up your environment / app

- install [nodeJS](https://nodejs.org/en/): a JavaScript-based open-source server framework with the largest package ecosystem in the world
  - check it installed properly by running `npm` in your command line
- download [ngrok](https://ngrok.com/download), a program used for HTTP tunneling
  - test by running `ngrok http 8000` in your command line
- create an application on Facebook by going to [https://developers.facebook.com/apps/](https://developers.facebook.com/apps/), and logging in and creating an application
  - select Messenger
  - in the Dashboard, copy your __App Secret__ somewhere
  - in Messenger > Settings, get your __Page Access Token__, which will require page creation

### Step 1: First steps

- run `npm init` in your project folder, it's going to ask you to enter lots of information, just leave these blank and hit return/enter on them and on the confirmation
  - what this does is set up your `package.json` file for your project, this file lists all the dependencies of your nodeJS app, and [more](https://docs.npmjs.com/files/package.json)
- create a `index.js` file in your project folder, your project structure should look like this:

```
project
|-- package.json
|-- index.js
```

- add a single print statement to `index.js`: `console.log('Hello World!')`
- replace the scripts on line 6 of `package.json` to:

```
  "scripts": {
    "start": "node index.js"
  },
```
  - this tells node where to find your file!
- run your project with `npm start`
  - you should see 'Hello World!' in your terminal output
