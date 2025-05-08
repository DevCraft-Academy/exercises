// strict mode
"use strict";

window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    text: document.getElementById("text"),
  };
  const errors = {
    name: document.getElementById("nameError"),
    email: document.getElementById("emailError"),
    text: document.getElementById("textError"),
  };
  const successMessage = document.getElementById("successMessage");

  // Attach blur event listeners to each field
  Object.keys(fields).forEach((fieldKey) => {
    const field = fields[fieldKey];
    field.addEventListener("blur", function () {
      validateSingleField(fieldKey, fields, errors);
    });
  });

  form.addEventListener("submit", handleFormSubmit);

  // Event handler for form submission
  function handleFormSubmit(event) {
    event.preventDefault();
    const validationResults = validateForm(fields, errors);

    if (validationResults.isValid) {
      successMessage.textContent = "Absenden erfolgreich!";

      form.reset();
    }
  }

  // Validate form fields and display errors
  function validateForm(fields, errors) {
    let isValid = true;

    Object.keys(fields).forEach((fieldKey) => {
      const fieldIsValid = validateSingleField(fieldKey, fields, errors);
      if (!fieldIsValid) isValid = false;
    });

    return { isValid };
  }

  // Validate a single field and display its error message
  function validateSingleField(fieldKey, fields, errors) {
    let isValid = true;
    const field = fields[fieldKey];
    const error = errors[fieldKey];
    const value = field.value;

    switch (fieldKey) {
      case "name":
        if (!validateText(value)) {
          error.textContent = "Der Name darf nicht leer sein.";
          isValid = false;
        } else {
          error.textContent = "";
        }
        break;

      case "email":
        if (!validateEmail(value)) {
          error.textContent = "Die E-Mail muss eine gültige E-Mail-Adresse sein.";
          isValid = false;
        } else {
          error.textContent = "";
        }
        break;

      case "text":
        if (!validateText(value)) {
          error.textContent = "Text darf nicht leer sein.";
          isValid = false;
        } else {
          error.textContent = "";
        }
        break;
    }

    return isValid;
  }



  // Validation helpers
  function validateText(name) {
    return name.trim() !== "";
  }

  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

 
});
