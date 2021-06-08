import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAz94Rhoyte6XXyR-PBJw3a8IY6YEBDLJ8",
    authDomain: "careci-d4f67.firebaseapp.com",
    projectId: "careci-d4f67",
    storageBucket: "careci-d4f67.appspot.com",
    messagingSenderId: "673047166660",
    appId: "1:673047166660:web:ea2aefe7d526302aed5391"
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);