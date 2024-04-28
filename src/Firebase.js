import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCEStBlLm6_Jvq-6Rlv8W4_UbAaU8bopHw",
  authDomain: "firestore-b646c.firebaseapp.com",
   projectId: "firestore-b646c",
   databaseURL: "https://firestore-b646c.firebaseio.com",
storageBuscket: "firestore-b646c.appspot.com",
messagingSenderId: "321885856147",
};


const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore(); 
const aut=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();
export {aut,provider};
export default db;

  