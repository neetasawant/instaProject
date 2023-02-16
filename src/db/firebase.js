import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';
import {getStorage} from 'firebase/storage';
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyApA6iOcu-1yTXJQshuzkPsRv7c9wu5ZE8",
  authDomain: "rn-int-proj.firebaseapp.com",
  projectId: "rn-int-proj",
  storageBucket: "rn-int-proj.appspot.com",
  messagingSenderId: "229096288674",
  appId: "1:229096288674:web:65d73a1cc8511620f682fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

