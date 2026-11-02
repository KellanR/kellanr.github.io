"use strict";
import { onAuthStateChanged, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { addDoc, collection, serverTimestamp} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import {auth, db} from './firebase.js';
let CurrentUser = null;
onAuthStateChanged(auth, (user) => {
    if (user) {
        CurrentUser = user;
    } else {
        CurrentUser = null;
    }
});
const form = document.querySelector("#ContactForm");
if (form) {
form.addEventListener("submit", async () => {
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
        // form.reset();
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