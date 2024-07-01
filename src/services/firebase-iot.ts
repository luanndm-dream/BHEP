// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCUJOl5jkzMIO1KRxgJyEPtiipPNzgccEg",
  authDomain: "bhep-iot.firebaseapp.com",
  databaseURL:
    "https://bhep-iot-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bhep-iot",
  storageBucket: "bhep-iot.appspot.com",
  messagingSenderId: "46057334140",
  appId: "1:46057334140:web:0005a64d92084ecae430f9",
  measurementId: "G-FY45GCZ5GH",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
