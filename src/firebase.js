// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtOzHMy5jKlqlnhgBI5oq1up6adg-cdwI",
  authDomain: "streaming-application-cf7ca.firebaseapp.com",
  projectId: "streaming-application-cf7ca",
  storageBucket: "streaming-application-cf7ca.firebasestorage.app",
  messagingSenderId: "444705988801",
  appId: "1:444705988801:web:231dc97abe803112c2f440"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
