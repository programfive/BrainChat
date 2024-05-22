import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQZIO2ATWYFdCQjoFGnwl4sFVwvOVwWwk",
  authDomain: "brainchat-dc761.firebaseapp.com",
  projectId: "brainchat-dc761",
  storageBucket: "brainchat-dc761.appspot.com",
  messagingSenderId: "71134724709",
  appId: "1:71134724709:web:7ec3783330298cd02abc8c",
  measurementId: "G-WSWXFVSJKJ",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage();
