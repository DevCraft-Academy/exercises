"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const errorName = document.getElementById("errorName");
    const errorEmail = document.getElementById("errorEmail");
    const errorMessage = document.getElementById("errorMessage");

    const successMessage = document.getElementById("successMessage");

    const checkForm = (event, isSubmit) => {
        event.preventDefault();

        let isValid = true;

        // Validate name
        if (nameInput.value.trim() === "") {
            errorName.textContent = "Name is required.";
            isValid = false;
        } else {
            errorName.textContent = "";
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            errorEmail.textContent = "Please enter a valid email address.";
            isValid = false;
        } else {
            errorEmail.textContent = "";
        }

        if (messageInput.value.trim() === "") {
            errorMessage.textContent = "Message is required.";
            isValid = false;
        } else {
            errorMessage.textContent = "";
        }

        if(!isValid) {
            successMessage.classList.add("hidden")
        } else if (isSubmit) {
            successMessage.classList.remove("hidden");

            // Here do the actual submission of the form
        }
    }

    form.addEventListener("submit", (event) => checkForm(event, true));
    form.addEventListener("input", (event) => checkForm(event, false));
});