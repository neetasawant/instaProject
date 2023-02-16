import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';
import {getStorage} from 'firebase/storage';
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyDP7l1zBfradtwIOshK2T0irnHdH10TRkw',
  authDomain: 'rn-nee.firebaseapp.com',
  databaseURL: 'https://rn-nee-default-rtdb.firebaseio.com',
  projectId: 'rn-nee',
  storageBucket: 'rn-nee.appspot.com',
  messagingSenderId: '923092555672',
  appId: '1:923092555672:web:6dce32ed55425492f57ded',
  measurementId: 'G-0DNFPRM66N',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

