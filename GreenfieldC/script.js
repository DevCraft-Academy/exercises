document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    confirmPassword: document.getElementById("confirmPassword"),
  };
  const errors = {
    name: document.getElementById("nameError"),
    email: document.getElementById("emailError"),
    password: document.getElementById("passwordError"),
    confirmPassword: document.getElementById("confirmPasswordError"),
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
      successMessage.textContent = "Form submitted successfully!";

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
        if (!validateName(value)) {
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

      case "password":
        if (!validatePassword(value)) {
          error.textContent = "Das Passwort muss mindestens 8 Zeichen lang sein.";
          isValid = false;
        } else {
          error.textContent = "";
        }
        break;

      case "confirmPassword":
        if (!validateConfirmPassword(fields.password.value, value)) {
          error.textContent = "“Passwort bestätigen” muss mit dem Passwortfeld übereinstimmen.";
          isValid = false;
        } else {
          error.textContent = "";
        }
        break;
    }

    return isValid;
  }



  // Validation helpers
  function validateName(name) {
    return name.trim() !== "";
  }

  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  function validatePassword(password) {
    return password.length >= 8;
  }

  function validateConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
  }
});
