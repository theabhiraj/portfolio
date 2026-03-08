import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAt2-gVLD5AROU3cVO5VvRPTOPHPKRIcUg",
  authDomain: "theabhiraj-in.firebaseapp.com",
  databaseURL: "https://theabhiraj-in-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "theabhiraj-in",
  storageBucket: "theabhiraj-in.firebasestorage.app",
  messagingSenderId: "761616726133",
  appId: "1:761616726133:web:a09ed2d8d7fdece069e03c",
  measurementId: "G-Q17CL3Z4PZ"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
