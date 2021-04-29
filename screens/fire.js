import firebase from "firebase";
import 'firebase/firestore';

const fbConfig = {
  apiKey: "AIzaSyDojAMWtmp583FkKn2bkmgqVEDUtEWuats",
  authDomain: "foodiary-app-ebaa5.firebaseapp.com",
  projectId: "foodiary-app-ebaa5",
  storageBucket: "foodiary-app-ebaa5.appspot.com",
  messagingSenderId: "1083319042430",
  appId: "1:1083319042430:web:7286d107c0951b6980f32f",
  measurementId: "G-N0V7FQFLY3"
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(fbConfig)
  : firebase.app()

const db = firebaseApp.firestore();

export default db