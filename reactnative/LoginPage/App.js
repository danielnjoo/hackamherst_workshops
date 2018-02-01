import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import {
   FIREBASE_API_KEY,
   AUTH_DOMAIN,
   DATABASE_URL,
   FIREBASE_PROJECT_ID,
   FIREBASE_STORAGE_BUCKET,
   MESSAGE_ID
} from 'react-native-dotenv';

export default class App extends React.Component {

  constructor() {
    super();
    firebase.initializeApp({
      apiKey: FIREBASE_API_KEY,
      authDomain: AUTH_DOMAIN,
      databaseURL: DATABASE_URL,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: MESSAGE_ID
    });
  }

 
  render() {
    return (
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
    );
  }
}

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
