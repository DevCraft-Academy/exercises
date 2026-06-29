const form = document.getElementsByTagName("form")[0];
const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const verifyPassword = document.querySelector("#verifyPassword");
const submit = document.querySelector("#submit");

function validateAllFields() {
  removeMessages();

  const isNameValid = validateName(fullName);
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password, verifyPassword);

  if (isNameValid && isEmailValid && isPasswordValid) {
    showSuccess(
      submit,
      "Alle Felder sind korrekt ausgefüllt, du kannst die Daten mit Klick auf den Absenden button versenden"
    );
  }
}

fullName.addEventListener("input", validateAllFields);
email.addEventListener("input", validateAllFields);
password.addEventListener("input", validateAllFields);
verifyPassword.addEventListener("input", validateAllFields);

submit.addEventListener("click", (e) => {
  e.preventDefault();

  removeMessages();

  const isNameValid = validateName(fullName);
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password, verifyPassword);

  if (isNameValid && isEmailValid && isPasswordValid) {
    showSuccess(
      submit,
      "Alle Felder sind korrekt ausgefüllt, du kannst die Daten mit Klick auf den Absenden button versenden"
    );

    const formData = new FormData(form);

    console.log([...formData.entries()]);
  }
});

// ...existing code... (der Rest der Validierungsfunktionen bleibt unverändert)
const validateName = (fullName) => {
  const name = fullName.value.trim();
  if (name.length === 0) {
    showError(fullName, "Bitte geben Sie Ihren Namen ein");
    return false;
  }
  return true;
};

const validateEmail = (email) => {
  const isEmailValid = String(email.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (!isEmailValid) {
    showError(email, "Bitte geben Sie eine gültige E-Mail-Adresse ein");
    return false;
  }
  return true;
};

const validatePassword = (password, verifyPassword) => {
  if (password.value.length < 8) {
    showError(password, "Das Passwort muss mindestens 8 Zeichen lang sein");
    return false;
  }

  if (password.value !== verifyPassword.value) {
    showError(password, "Die Passwörter stimmen nicht überein");
    showError(verifyPassword, "Die Passwörter stimmen nicht überein");
    return false;
  }
  return true;
};

function showError(input, message) {
  const error = document.createElement("p");
  error.textContent = message;
  error.className = "error";
  input.insertAdjacentElement("afterend", error);
}

function showSuccess(input, message) {
  const success = document.createElement("p");
  success.textContent = message;
  success.className = "success";
  input.insertAdjacentElement("afterend", success);
}

function removeMessages() {
  const removableElements = document.querySelectorAll(".error, .success");
  removableElements.forEach((element) => element.remove());
}
