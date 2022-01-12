
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBWoWDgPUTo1TY5fuTu_AGma5z2dqXAcXA",
    authDomain: "todo-list-projects.firebaseapp.com",
    projectId: "todo-list-projects",
    storageBucket: "todo-list-projects.appspot.com",
    messagingSenderId: "72874821012",
    appId: "1:72874821012:web:59f66f257062ff00c3fb81",
    measurementId: "G-VS9ELLMV99"
  });

  const db = firebaseApp.firestore()

  export default db
