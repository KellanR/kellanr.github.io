"use strict";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {auth, db} from './firebase.js';

const provider = new GoogleAuthProvider();
const msg = document.querySelector("#msg");
const loginFormTitle = document.querySelector("#loginFormTitle");

const googleBtn = document.querySelector("#google-btn");
const signoutBtn = document.querySelector("#signoutBtn");
const spinner = document.querySelectorAll("#spinner");

const logoutBtn = document.querySelector("#logout-btn"); //Index.html logout button

if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
    msg.textContent = "";
    spinner.hidden = false;
    try {
        await signInWithPopup(auth, provider);
    } catch (err) {
        msg.textContent = `Error: ${err.message}`;
    } finally {
        spinner.hidden = true;
    }
    });
}
if (signoutBtn) {
    signoutBtn.addEventListener("click", () => {
        spinner.hidden = false;
        signOut(auth);
    });
    
}
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        signOut(auth);
    });   
}
onAuthStateChanged(auth, (user) => {
    
    if (user) { 
        if (loginFormTitle) {
            loginFormTitle.textContent = `Welcome! ${user.displayName}`;
        }
        if (spinner) {
            spinner.hidden = true;
        }
        if (googleBtn) {
            googleBtn.hidden = true;
        }
        if (logoutBtn) {
            logoutBtn.hidden = false;
        }
        if (document.querySelector("#signoutBtn")) {
            document.querySelector("#signoutBtn").hidden = false;
        }
    
    }   else {
        if (window.location.pathname !== "/7/index.html") {
            window.location.href = "/7/index.html";
        }
        
        if (spinner) {
            spinner.hidden = true;
        }
        if (logoutBtn) {
            logoutBtn.hidden = true;
        }
        if (googleBtn) {
            googleBtn.hidden = false;
        }
        if (loginFormTitle) {
            loginFormTitle.textContent = "Please enter your credentials to access the Space Explorer.";
        }
        if (document.querySelector("#signoutBtn")) {
            document.querySelector("#signoutBtn").hidden = true;
        }
    }
})

