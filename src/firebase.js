// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getFirestore} from "@firebase/firestore"
import { getAuth, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyNDQoJQ2W7uKvqK28FiryPcymhfslkdY",
  authDomain: "gasterblaster-52101.firebaseapp.com",
  projectId: "gasterblaster-52101",
  storageBucket: "gasterblaster-52101.firebasestorage.app",
  messagingSenderId: "409920526296",
  appId: "1:409920526296:web:49f30b37003bf0ed9604ad",
  measurementId: "G-67FLZWXK8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)

const auth = getAuth(app);

export { auth }