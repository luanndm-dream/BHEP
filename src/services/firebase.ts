
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJGNumz2AIuBR1_p-hmHvlYPkj3_zzxTM",
  authDomain: "bhep-demo.firebaseapp.com",
  databaseURL: "https://bhep-demo-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bhep-demo",
  storageBucket: "bhep-demo.appspot.com",
  messagingSenderId: "348701608516",
  appId: "1:348701608516:web:95c2f13cd8e59509e18a11",
  measurementId: "G-95E4PPDYEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);