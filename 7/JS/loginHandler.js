import { getAuth, onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut, updatePassword,
  reauthenticateWithCredential, EmailAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const Btn = document.querySelector("#loginBtn");
Btn.addEventListener("click",()=>{
    Btn.textContent = "Coming soon!"
});

onAuthStateChanged(auth, (user) => {
    //WHEN LOGGED IN
})