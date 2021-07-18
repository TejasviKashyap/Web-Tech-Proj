//import * as firebase from "firebase/app";
//import app from "firebase/app";
import firebase from 'firebase';
import React, { createContext } from "react";
import "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDmrOuxmvnAXaOabeyIJYVWKppwAV41MCQ",
    authDomain: "webtechlab-ecb4e.firebaseapp.com",
    projectId: "webtechlab-ecb4e",
    storageBucket: "webtechlab-ecb4e.appspot.com",
    messagingSenderId: "1050771241211",
    appId: "1:1050771241211:web:dea588b8591934a3de985e"
  };
  class Firebase {
    constructor() {
      let app = null;
      if (!firebase.apps.length) {
        app = firebase.initializeApp(firebaseConfig);
     }else {
        app = firebase.app(); // if already initialized, use that one
     }
      this.auth = app.auth();
      this.db = app.firestore();
    }
    createUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    signInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    signOut = () => this.auth.signOut();
   
    passwordReset = (email) => this.auth.sendPasswordResetEmail(email);
    passwordUpdate = (password) => this.auth.currentUser.updatePassword(password);
  }

export default Firebase;
