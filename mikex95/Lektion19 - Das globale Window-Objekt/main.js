"use strict";

window.addEventListener("DOMContentLoaded", function () {
  (function () {
    const submit = document.querySelector("#submit");
    const fullName = document.querySelector("#fullName");
    const email = document.querySelector("#email");
    const message = document.querySelector("#story");
    const form = document.querySelector("form");

    const validateAllFields = (e) => {
      removeSuccessMessages();

      if (
        fullName.value &&
        validateEmail(email.value) &&
        message.value.trim()
      ) {
        showSuccess();
      }
    };

    fullName.addEventListener("input", validateAllFields);
    email.addEventListener("input", validateAllFields);
    message.addEventListener("input", validateAllFields);

    submit.addEventListener("click", (e) => {
      e.preventDefault();

      if (
        fullName.value &&
        validateEmail(email.value) &&
        message.value.trim()
      ) {
        const formData = new FormData(form);
        console.log([...formData.entries()]);
        form.submit();
      } else {
        showErrors();
      }

      return;
    });

    const showSuccess = () => {
      const p = document.createElement("p");
      p.classList.add("success");
      p.innerText =
        "Alle Felder sind korrekt ausgefüllt, du kannst die Daten mit Klick auf den Absenden button versenden";
      submit.insertAdjacentElement("afterend", p);
    };

    const showErrors = () => {
      if (!fullName.value) {
        const p = document.createElement("p");
        p.classList.add("error");
        p.innerText = "Name ist erforderlich.";
        fullName.insertAdjacentElement("afterend", p);
      }
      if (!validateEmail(email.value)) {
        const p = document.createElement("p");
        p.classList.add("error");
        p.innerText = "E-Mail ist ungültig.";
        email.insertAdjacentElement("afterend", p);
      }
      if (!message.value.trim()) {
        const p = document.createElement("p");
        p.classList.add("error");
        p.innerText = "Nachricht ist erforderlich.";
        message.insertAdjacentElement("afterend", p);
      }
    };

    const removeSuccessMessages = () => {
      const elements = document.querySelectorAll(".success, .error");
      elements.forEach((el) => el.remove());
    };

    const validateEmail = (emailValue) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    };
  })();
});
