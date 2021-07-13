import firebase  from "firebase/app";
import "firebase/auth";
import "firebase/firestore"

var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "manutencao-app-c8c44.firebaseapp.com",
    projectId: "manutencao-app-c8c44",
    storageBucket: "manutencao-app-c8c44.appspot.com",
    messagingSenderId: "461120527113",
    appId: "1:461120527113:web:b3694b0293d4ceb33d51d8",
    measurementId: "G-BGCGDBVNL2"
  };

firebase.initializeApp(firebaseConfig);

  // export default firebase;

  export const auth = firebase.auth();
  export const db = firebase.firestore();