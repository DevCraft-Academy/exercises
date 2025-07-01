"use strict"

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password1 = document.getElementById("password1");
  const password2 = document.getElementById("password2");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const password1Error = document.getElementById("password1-error");
  const password2Error = document.getElementById("password2-error");
  console.log(form);
  form.addEventListener("submit", function (event) {
      if (password1 != password2) password2Error.textContent = "Nicht identisch";
    if(!form.checkValidity() && password1.value != password2.value) event.preventDefault();
  });
});
