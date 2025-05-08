document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const passwordConfirmInput = document.getElementById("confirmPassword");

    const errorName = document.getElementById("errorName");
    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");
    const errorPasswordConfirm = document.getElementById("errorPasswordConfirm");

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

        // Validate password
        if (passwordInput.value.length < 8) {
            errorPassword.textContent = "Password must be at least 8 characters long.";
            isValid = false;
        } else {
            errorPassword.textContent = "";
        }

        // Validate password confirmation
        if (passwordConfirmInput.value !== passwordInput.value) {
            errorPasswordConfirm.textContent = "Passwords do not match.";
            isValid = false;
        } else {
            errorPasswordConfirm.textContent = "";
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