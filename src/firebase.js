import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDptCQDAzYzzWFZOP7DcqAhrYUcxtewGDE",
  authDomain: "dquiz-d29ef.firebaseapp.com",
  projectId: "dquiz-d29ef",
  storageBucket: "dquiz-d29ef.appspot.com",
  messagingSenderId: "489335460244",
  appId: "1:489335460244:web:04ce42ddac968816483f81",
  measurementId: "G-QRYKW292CP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();


export { db, auth, storage }; 