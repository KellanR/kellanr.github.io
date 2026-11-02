"use strict";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {auth} from './firebase.js';

const provider = new GoogleAuthProvider();
const msg = document.querySelector("#msg");
const loginFormTitle = document.querySelector("#loginFormTitle");

const googleBtn = document.querySelector("#google-btn");
const signoutBtn = document.querySelector("#signoutBtn");
const spinner = document.querySelectorAll("#spinner");

const logoutBtn = document.querySelector("#logout-btn"); //Index.html logout button
let CurrentUser = null;
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
    CurrentUser = user;
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
        currentUser = null;
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

const form = document.querySelector("#ContactForm");
if (form) {
form.addEventListener("submit", async (event) => {
    let submitBtn = document.querySelector("#contactSubmitBtn");
    // successMsg.hidden = true;
    // errorMsg.hidden = true;
    submitBtn.disabled = true;
    try {
        await addDoc(collection(db, "contactRequest"), {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim(),
            uid: CurrentUser.uid,
            submittedAt: serverTimestamp()
        });
        // successMsg.textContent = "Thanks! Your message was received and saved.";
        // successMsg.hidden = false;
        form.reset();
    } catch (error) {
        console.error("Error sending message: ", error);
        // errorMsg.textContent = `Sorry, we couldn't send your message: ${error.message}`;
        // errorMsg.hidden = false;
    } finally {
        // spinner.hidden = true;
        submitBtn.disabled = false;
    }
});
}