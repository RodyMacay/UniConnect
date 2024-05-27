import { initializeApp } from "firebase/app";
/* import { getAnalytics } from "firebase/analytics"; */
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, onSnapshot, getFirestore, orderBy, query } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTcC93xEe8SPjtz5YXm44KMPW1Ub-axv8",
  authDomain: "unniconet.firebaseapp.com",
  projectId: "unniconet",
  storageBucket: "unniconet.appspot.com",
  messagingSenderId: "1044655444344",
  appId: "1:1044655444344:web:c5c8dae6a87f047bb5788d",
  measurementId: "G-HZ8YLD05R2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
/* const analytics = getAnalytics(app); */
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {  auth, db, storage, ref, uploadBytes, getDownloadURL, collection, addDoc, serverTimestamp, onSnapshot, orderBy, query};