import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyB2KDroOwVA8BquU2TDKe9aUt6NbsFuygM",
    authDomain: "anikapanika-357d1.firebaseapp.com",
    projectId: "anikapanika-357d1",
    storageBucket: "anikapanika-357d1.appspot.com",
    messagingSenderId: "41216863064",
    appId: "1:41216863064:web:91b24f512df6535922132d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
export const storage = getStorage(app);