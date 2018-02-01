## Login App With React Native and Firebase, 14th February
### By Nate Corley

What you'll build: a login application for a travel site where a user can enter a username and password to gain access to a particular account or region of a site.

What you'll build:
<br/>
<img src="https://github.com/danielnjoo/hackamherst_workshops/blob/master/reactnative/demo.png" width="400">

### 0-60 Real Fast

- `git clone https://github.com/danielnjoo/hackamherst_workshops.git`, install git [here](https://git-scm.com/downloads) if you don't have it
- Install `Node.js` [here](https://nodejs.org/en/); this simultaneously installs `npm`
- Install `create-react-native-app` with `npm install -g create-react-native-app`
- Download the [Expo](https://expo.io/) app for your apple or android smartphone, and connect your phone to the same WiFi as your computer

### Step 0: Setting up your environment
Commit hash: N/A

- `Node.js` is a JavaScript runtime engine that allows web server creation in pure, beautiful JavaScript
- `npm` is an essential package manager for JavaScript - any package is only one quick `npm install` away. `npm install girlfriend` has had mixed results for CS majors in the past.
- `create-react-native-app` is the solution to all of React Native's age-old problems. There used to be a million configuration issues, and a multitude of packages to be installed. Facebook's ingenious solution fixes these problems.
- `Expo` is a service that allows easy simulation of your app, possibly the coolest feature of React Native

### Step 1: Wow, React Native is so cool, holy cow.
Commit hash: N/A

If the following process doesn't blow your mind, then you have my respect.

- We're going to set up a new project, so make a new folder somewhere accessible: `mkdir reactnative`
- Setting up the project is as simple as `create-react-native-app TestApp`
- `cd TestApp`
- The project structure has been set up for us already:
```
LoginApp
|-- App.js
|-- README.md
|-- node_modules
     |-- (a zillion packages are installed in here)
|-- yarn.lock
|-- App.test.js
|-- app.json
|-- package.json
```
- For our purposes, this project structure will suffice. More complicated projects might want to consider [something a little more scalable](https://medium.com/the-react-native-log/organizing-a-react-native-project-9514dfadaa0).
- Run `npm start`
- Open the `Expo` app on your smartphone, and scan the QR code that appears in the terminal
- Wow. Beautiful. Guess what? It hot reloads. Go ahead and open up `App.js` in your preferred text editor. For me, it's `atom App.js`
- Change some of the words between the `<Text></Text>` tags on lines `8-10` to your choosing, save the file, and be impressed.
- Congrats! You just created your first React Native app.

### Step 2: Setting up the basic UI
Commit hash: ea3d168e60195fbf9b482d4d7768ecac6f0fc84b

We're going to be using some component libraries to minimize the amount of styling that we have to do ourselves.

- `yarn add react-native-elements` to install some useful front-end components. `yarn` should have been installed with `create-react-native-app`, it's a package manager similar to `npm`
- We're going to need more than `<Text>` and `<View>` components, so go ahead and add some more imports at the top of `App.js`:
```
import { StyleSheet, Text, View, ImageBackground, TextInput } from 'react-native';
import { Button } from 'react-native-elements'
``` 
- We're going to set up the front-end with some quick & dirty JSX. JSX is the HTML-like code that we see in App.js (with the `<Text></Text>` tags, etc.)
- Toss in the JSX framework:
```
<ImageBackground
    style={styles.backgroundImage}
    source={{ uri: 'https://www.natezeman.com/images/xl/0551_NZ_Sky_Dance_WM.jpg' }}
>
    <View style={styles.formContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>TRAVEL THE WORLD</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="white"
          />
          <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry={true}
          />
        </View>
        <Button
            title='LOG IN'
            buttonStyle={styles.button}
            textStyle={{ fontWeight: 'bold', color: 'white' }}
        />
    </View>
</ImageBackground>
```
This code sets up the  basic outline of the app. In React Native, the `View` component is a container - kind of like HTML's `<div>`. `<TextInput>` are, shockingly, text inputs, and `<ImageBackground>` serves as a wrapper to create the background image. If this code looks foreign to you, that's okay: with a little googling all can be revealed.

- This code still won't compile, because we referenced some properties of the `styles` objects that don't exist yet. All React Native components - `<TextInput>`, `<Button>`, `<View>`, etc. - take a `style` prop (a prop is one of the "properties" you set when you create a component) which should be an object containing CSS-esque styling. We've got to create that now:
```
const styles = StyleSheet.create({
  formContainer: {
    height: 200,
    justifyContent: 'space-around',
  },
  inputContainer: {
    height: 100,
    justifyContent: 'space-around',

  },
  input: {
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    color: 'white',
    padding: 7,
  },
  button: {
    height: 50,
    width: 250,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '900',
  },
});
```
That code should be pretty self explanatory if you've ever seen much CSS and Flexbox before. If not, [Flexbox Defense](http://www.flexboxdefense.com/) is a terrific and enjoyable way to learn Flexbox formatting, and there's a million websites for familiarizing yourself with CSS. React Native doesn't use vanilla CSS - it does camel case capitlizations and a couple other quirks, as explained in the [documentation](https://facebook.github.io/react-native/docs/style.html).

Try reloading the app, and take a look! Next, we're going to set up the back-end to validate user input.


### Step 3: Backend with Firebase 
Commit hash: 99f298b925f79efd779cb26e12db9db5d532e927

Traditionally backend is a pain. When building JavaScript projects, many developers turn to frameworks such as Django (for Python) or Node.js. Django and Node.js are still essential for large projects requiring significant control and customization, but to get up and running quickly, we're going to use Google's free backend API: Firebase.

There's two components to this section. The remote setup on the Firebase website, and the local configuration.

- Remote setup:
  - Head on over to [Firebase's website](https://console.firebase.google.com/u/0/?pli=1) and log in. If you have a google account, you should be all set.
  - Create a new project and name it `LoginApp`. It'll take a few seconds to set up your project.
  - Hit "Get Started" under the `Authentication` panel, and set up a sign-in method. We're going to be using email/password for simplicity.
  - Toggle to the `USERS` tab and add a user - yourself. Make sure you remember your username/password combination.
  - Click the `WEB SETUP` near the top left of the page. You'll need this information later, so keep that tab handy.
- Local configuration:
  - We're going to need the `firebase` package, so `yarn install firebase`
  - Open up `App.js`
  - Throw in an import: `import firebase from 'firebase';`
  - right below the line `export default class App extends React.Component {`, add a new function:
  ```
  constructor() {
    super();
    firebase.initializeApp({
      apiKey: <YOUR KEY>,
      authDomain: <YOUR AUTH DOMAIN>,
      databaseURL: <YOUR URL>,
      projectId: <YOUR ID>,
      storageBucket: <YOUR BUCKET>,
      messagingSenderId: <YOUR MESSAGE ID>
    });
  }
  ```
  Replace that tagged fields with your appropriate keys, given on the Firebase website. Quick explanation: we're creating a `constructor` function in our class. Much like Java, this is run whenever our `<App>` component is mounted (created). Inside, we're calling `super()` to preserve and properties passed down (weird `React.js` things), and then we're initializing our `Firebase` back-end API.

  That's it for the back end! Next, we're going to set our App up to actually validate.

  ### Step 4: Validation and finishing touches 
  Commit hash: d211bd1b20561ba929f43f2ac76fbb86d68563c6

  Our backend is set up, and we've created a user. Now's the time to make it functional. First, a couple housekeeping items:

  - To preserve sanity when entering emails and passwords, add a couple more props to the appropriate `<TextInput>`'s:
  ```
  autoCapitalize="none"
  spellCheck={false}
  ```
  - We're be going to use `alerts` to inform the user if their login was accepted, so import `Alert` from `react-native` (just add it to the list).
  - Setting up controlled components
    - React components have something called a `state` - it's just an object. This is sort of like class variable; they can be modified and referred to. We define the initial state in the constructor. Add the line `this.state = { email: '', password: '' }` below our firebase initialization. We can now refer to those two variabels - `email` and `password` with `this.state.email`, etc.
    - We want our `<TextInput>`'s to "know" their own value. For the email component, this would look something like:
    ```
    value={this.state.email}
    onChangeText={(newEmail) => this.setState({ email: newEmail })}
    ```
    - It's similar for the password component: see if you can figure it out!
  - We need a function to handle logins. Create the login function below the constructor:
  ```
   handleLogin = () => {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => { Alert.alert("Success!", "You're all set.") })
      .catch(() => {
        Alert.alert("Login Failed!", "Incorrect Email/Password.",
          [
            { text: 'Send Reset Password Email', onPress: this.handlePasswordReset },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );
      });
  }
  ```
  We dove into a bit of ES6 JavaScript here - check out the [new features](http://es6-features.org/#Constants) that've become ubiquitous throughout React and React Native. The gist of the code: query firebase with the email and password combination stored in `this.state`. If the API returns success, tell the user they're logged in. Otherwise, display a failure message, and offer them a password reset option. We'll build that soon.

  - Hook up the button to call our `handleLogin` function! Add `onPress={this.handleLogin}` as a prop.
  - Last, set up the `handlePasswordReset` function we referenced earlier.
  ```
  handlePasswordReset = () => {
    firebase.auth().sendPasswordResetEmail(this.state.email).then(function () {
      Alert.alert("Success", "Reset password email sent.");
    }).catch(function (error) {
      Alert.alert("Oops!", "Reset password email couldn't be sent.");
    });
  }
  ```

  That's it. We're done. Of course, there's so much more to do before this becomes a marginally functional log-in app, but I'll leave the rest to google. For instance nothing really happens when we log in. In the future, we might want to set up some routing so that it changes screens after a successful login attempt. Or, we might want to add a "create account" option. 

  Cheers,
  Nate

