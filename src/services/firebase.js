import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA-J0hw-UwaIqSsdM4TLxCgKivRWIgE4d4",
  authDomain: "urban-flow-e470a.firebaseapp.com",
  projectId: "urban-flow-e470a",
  storageBucket: "urban-flow-e470a.firebasestorage.app",
  messagingSenderId: "491051191298",
  appId: "1:491051191298:web:0656cc4a526d6590596b1b",
  measurementId: "G-77S9FFR2QY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };