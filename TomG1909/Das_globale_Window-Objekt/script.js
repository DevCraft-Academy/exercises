"use strict";
const myForm = document.getElementById("myForm");

myForm.addEventListener("submit", submitForm);
myForm.addEventListener("change", isValidEmail);

function isValidEmail() {
  const formData = new FormData(myForm);
  const email = formData.get("email");

  const emailError = document.getElementById("emailError");
  const isValid = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (!isValid) {
    emailError.textContent = "Ungültige E-Mail-Adresse.";
  } else {
    emailError.textContent = "";
  }
  return isValid;
}
function submitForm(event) {
  event.preventDefault();

  if (isValidEmail()) {
    alert("Erfolgreich abgeschickt!");
  }
  myForm.reset();
}
