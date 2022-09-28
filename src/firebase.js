import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDm7f8Tg6jVEi9Ml0LxUeMoSfnOFv-lQOw",
	authDomain: "project-b9e3c.firebaseapp.com",
	projectId: "project-b9e3c",
	storageBucket: "project-b9e3c.appspot.com",
	messagingSenderId: "330518996813",
	appId: "1:330518996813:web:19ea7906803cc5ac113904",
	measurementId: "G-9S2YQEBWZH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
