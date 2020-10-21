import firebase from 'firebase'
const  firebaseConfig = {
    apiKey: "AIzaSyB6EPQKc_i-_CWXpah9RK_JaiN66a2H6Sc",
    authDomain: "medication-guide-3017f.firebaseapp.com",
    databaseURL: "https://medication-guide-3017f.firebaseio.com",
    projectId: "medication-guide-3017f",
    storageBucket: "medication-guide-3017f.appspot.com",
    messagingSenderId: "41113011367",
    appId: "1:41113011367:web:d823cefee019b37ea70782",
    measurementId: "G-RKNDQ0W0EN"
  };
  firebase.initializeApp(firebaseConfig);

  export default firebase