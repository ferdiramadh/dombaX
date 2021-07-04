import firebase from 'firebase/app'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCOaQMWmyKPOu-Q8rBsFFVVKsY7Yc6RFt0",
    authDomain: "domba-x.firebaseapp.com",
    projectId: "domba-x",
    storageBucket: "domba-x.appspot.com",
    messagingSenderId: "740405248805",
    appId: "1:740405248805:web:7415e878e783d21cf750cc",
    measurementId: "G-X1L9DCR90Z"
  };
if(!firebase.apps.length){
  
  firebase.initializeApp(firebaseConfig)
} else {
    firebase.app()
}








export default firebase;