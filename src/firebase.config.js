import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtnwP7WICgg0XrvP8PausdN0Ydy_SO9ds",
  authDomain: "hotel-a8945.firebaseapp.com",
  projectId: "hotel-a8945",
  storageBucket: "hotel-a8945.firebasestorage.app",
  messagingSenderId: "735496938454",
  appId: "1:735496938454:web:101923b7ff1bc488553a77",
  measurementId: "G-9RBRXYC2HM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);