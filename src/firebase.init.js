// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjZ662ZbN9OAbNSRPUErZqG79z74LyNyM",
  authDomain: "my-email-password-auth.firebaseapp.com",
  projectId: "my-email-password-auth",
  storageBucket: "my-email-password-auth.appspot.com",
  messagingSenderId: "758810995803",
  appId: "1:758810995803:web:7bc9ee6d965100d9d7a37e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;