import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAATxcwvgDIWvzZthMphPWvEkcYcQ-LVLw",
  authDomain: "brill-shift-management.firebaseapp.com",
  projectId: "brill-shift-management",
  storageBucket: "brill-shift-management.firebasestorage.app",
  messagingSenderId: "804043594421",
  appId: "1:804043594421:web:ca2a9209b3d135d8e4bcfc",
  measurementId: "G-F3D8LKWF6F"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)