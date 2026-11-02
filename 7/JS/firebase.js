import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import {getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL7F96OJVgscq7KbbrNPVDiLTkluQHB9M",
  authDomain: "planetexplorer-3e10d.firebaseapp.com",
  databaseURL: "https://planetexplorer-3e10d-default-rtdb.firebaseio.com",
  projectId: "planetexplorer-3e10d",
  storageBucket: "planetexplorer-3e10d.firebasestorage.app",
  messagingSenderId: "690375882071",
  appId: "1:690375882071:web:5b428367859d5a23e5fa12"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

