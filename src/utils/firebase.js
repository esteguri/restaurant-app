import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAOmjwdnN8kaJa5ik1tl0imeQo96IwQeN0",
    authDomain: "restaurants-app-2b133.firebaseapp.com",
    projectId: "restaurants-app-2b133",
    storageBucket: "restaurants-app-2b133.appspot.com",
    messagingSenderId: "471043435665",
    appId: "1:471043435665:web:72f5bc3e8f0298b7bd6330"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
