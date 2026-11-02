import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL7F96OJvgscq7KbbrNPVdiLTkluQHB9M",
  authDomain: "planetexplorer-3e10d.firebaseapp.com",
  databaseURL: "https://firebaseio.com",
  projectId: "planetexplorer-3e10d",
  storageBucket: "planetexplorer-3e10d.firebasestorage.app",
  messagingSenderId: "690375882071",
  appId: "1:690375882071:web:5b428367859d5a23e5fa12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export your firestore database instance so you can read it elsewhere!
export const db = getFirestore(app);

// Simple temporary log to make sure the file is executing
console.log("Firebase config module successfully loaded!");
