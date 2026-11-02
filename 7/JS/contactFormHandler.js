"use strict";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
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
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let submitBtn = document.querySelector("#contactSubmitBtn");
    let spinner = document.querySelector("#contactSubmitSpinner");
    spinner.hidden = false;
    let successMsg = document.querySelector("#successMsg");
    let errorMsg = document.querySelector("#errorMsg");
    successMsg.hidden = true;
    errorMsg.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    try {
        await addDoc(collection(db, "contactRequest"), {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim(),
            uid: CurrentUser.uid,
            submittedAt: serverTimestamp()
        });
        successMsg.textContent = "Thanks! Your message was received and saved.";
        successMsg.hidden = false;
        form.reset();
    } catch (error) {
        errorMsg.textContent = `Sorry, we couldn't send your message: ${error.message}`;
        errorMsg.hidden = false;
    } finally {
        successMsg.hidden = true;
        errorMsg.hidden = true;
        spinner.hidden = true;
        submitBtn.textContent = "Submit";
        submitBtn.disabled = false;
    }
});
}