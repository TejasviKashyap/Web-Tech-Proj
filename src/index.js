import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social/bootstrap-social.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import  { FirebaseContext } from "./firebase/context";
import  Firebase from './firebase/firebase';
import app from 'firebase/app';
import "firebase/auth";

const appl = (
    <FirebaseContext.Provider value={new Firebase()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseContext.Provider>
  );

ReactDOM.render(appl, document.getElementById("root"));

registerServiceWorker();
