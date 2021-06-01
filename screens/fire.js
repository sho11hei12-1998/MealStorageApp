import firebase from "firebase";
import 'firebase/firestore';

const fbConfig = {
  apiKey: "AIzaSyAxGIgIddf3AVto-rPUJqsYblrY0fro44s",
  authDomain: "mealsharingapp.firebaseapp.com",
  projectId: "mealsharingapp",
  storageBucket: "mealsharingapp.appspot.com",
  messagingSenderId: "690876875873",
  appId: "1:690876875873:web:e107d5fc22cfacbe909620",
  measurementId: "G-ZQJQVS00V0"
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(fbConfig)
  : firebase.app()

const db = firebaseApp.firestore();

export default db