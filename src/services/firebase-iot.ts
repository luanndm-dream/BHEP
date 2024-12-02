// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "**************************************",
  authDomain: "**************************************",
  databaseURL:
    "**************************************",
  projectId: "bhep-iot",
  storageBucket: "bhep-iot.appspot.com",
  messagingSenderId: "**************************************",
  appId: "**************************************",
  measurementId: "**************************************",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
