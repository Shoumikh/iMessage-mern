import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBOeHZMY-fXoeHd0YK2_wjZFYG6R0Naq9I",
  authDomain: "imessage-clone-shoumikh.firebaseapp.com",
  databaseURL: "https://imessage-clone-shoumikh.firebaseio.com",
  projectId: "imessage-clone-shoumikh",
  storageBucket: "imessage-clone-shoumikh.appspot.com",
  messagingSenderId: "968495468055",
  appId: "1:968495468055:web:eb8debfa0d17b543f5d652",
  measurementId: "G-TP5XFZQL59",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
