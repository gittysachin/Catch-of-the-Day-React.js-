import Rebase from 're-base';  // React-Firebase Specific Package
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
   apiKey: "AIzaSyAgXqlIlvH31aU73Jq0ZvZrLqlXFX0k-iw",
   authDomain: "catch-of-the-day-sachin-1.firebaseapp.com",
   databaseURL: "https://catch-of-the-day-sachin-1.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
