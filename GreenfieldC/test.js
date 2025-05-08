document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
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

  form.addEventListener("submit", handleFormSubmit);

  // Event handler for form submission
  function handleFormSubmit(event) {
    event.preventDefault();
    const validationResults = validateForm(fields, errors);

    if (validationResults.isValid) {
      successMessage.classList.remove("hidden");
    }
  }

  // Validate form fields and display errors
  function validateForm(fields, errors) {
    let isValid = true;

    if (!validateName(fields.name.value)) {
      errors.name.textContent = "Name is required";
      isValid = false;
    } else {
      errors.name.textContent = "";
    }

    if (!validateEmail(fields.email.value)) {
      errors.email.textContent = "Invalid email address";
      isValid = false;
    } else {
      errors.email.textContent = "";
    }

    if (!validatePassword(fields.password.value)) {
      errors.password.textContent = "Password must be at least 8 characters";
      isValid = false;
    } else {
      errors.password.textContent = "";
    }

    if (!validateConfirmPassword(fields.password.value, fields.confirmPassword.value)) {
      errors.confirmPassword.textContent = "Passwords do not match";
      isValid = false;
    } else {
      errors.confirmPassword.textContent = "";
    }

    return { isValid };
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
