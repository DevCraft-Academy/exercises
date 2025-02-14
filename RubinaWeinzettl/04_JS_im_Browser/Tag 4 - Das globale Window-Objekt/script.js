"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const inputName = document.getElementById("name");
    const inputEmail = document.getElementById("email");
    const inputMessage = document.getElementById("message");
    const errorName = document.getElementById("errorName");
    const errorMail = document.getElementById("errorMail");
    const errorMessage = document.getElementById("errorMessage");
    const success = document.getElementById("success");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = inputName.value;
        const email = inputEmail.value;
        const message = inputMessage.value;

        let isValid = true;
        
        if (name == "") {
            document.getElementById("errorName").innerHTML = "Name ist ein Pflichtfeld. Bitte geben Sie einen Namen ein!";
            errorName.classList.remove("hidden");
            isValid = false;
        }
        
        if (email == "") {
            document.getElementById("errorMail").innerHTML = "E-Mail ist ein Pflichtfeld. Bitte geben Sie eine E-Mail-Adresse ein!";
            errorMail.classList.remove("hidden");
            isValid = false;
        }
        
        if (message == "") {
            document.getElementById("errorMessage").innerHTML = "Das Nachrichtenfeld darf nicht leer sein!";
            errorMessage.classList.remove("hidden");
            isValid = false;
        }
        
        if (!isValidEmail(email)) {
            document.getElementById("error").innerHTML = "Bitte geben Sie eine gültige E-Mail Adresse ein!";
            errorMail.classList.remove("hidden");
            isValid = false;
        }

        if (isValid == true) {
            inputName.value = ""; 
            inputEmail.value = ""; 
            inputMessage.value = ""; 
            errorMail.classList.add("hidden");
            errorName.classList.add("hidden");
            errorMessage.classList.add("hidden");
            success.classList.remove("hidden");
        } 
        
        function isValidEmail(email) {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(email);
        }
    });  
}); 

