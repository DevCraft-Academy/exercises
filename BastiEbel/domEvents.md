<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formularvalidierung</title>
    <style>
        .error {
            color: red;
            font-size: 0.9em;
        }
        .success {
            color: green;
            font-size: 1em;
        }
    </style>
</head>
<body>
    <form id="myForm">
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Dein Name">
            <span class="error" id="nameError"></span>
        </div>
        <div>
            <label for="email">E-Mail:</label>
            <input type="email" id="email" name="email" placeholder="Deine E-Mail">
            <span class="error" id="emailError"></span>
        </div>
        <div>
            <label for="password">Passwort:</label>
            <input type="password" id="password" name="password" placeholder="Dein Passwort">
            <span class="error" id="passwordError"></span>
        </div>
        <div>
            <label for="confirmPassword">Passwort bestätigen:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Passwort bestätigen">
            <span class="error" id="confirmPasswordError"></span>
        </div>
        <button type="submit">Absenden</button>
        <div class="success" id="successMessage"></div>
    </form>

    <script>
    document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const successMessage = document.getElementById('successMessage');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;

        // Name validation
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name darf nicht leer sein.';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Bitte eine gültige E-Mail-Adresse eingeben.';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // Password validation
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Das Passwort muss mindestens 8 Zeichen lang sein.';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }

        // Confirm password validation
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Passwörter stimmen nicht überein.';
            isValid = false;
        } else {
            confirmPasswordError.textContent = '';
        }

        if (isValid) {
            successMessage.textContent = 'Formular erfolgreich abgeschickt!';
            form.submit();
        } else {
            successMessage.textContent = '';
        }
    });

    // Real-time validation
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name darf nicht leer sein.';
        } else {
            nameError.textContent = '';
        }
    });

    emailInput.addEventListener('input', () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Bitte eine gültige E-Mail-Adresse eingeben.';
        } else {
            emailError.textContent = '';
        }
    });

    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Das Passwort muss mindestens 8 Zeichen lang sein.';
        } else {
            passwordError.textContent = '';
        }
    });

    confirmPasswordInput.addEventListener('input', () => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Passwörter stimmen nicht überein.';
        } else {
            confirmPasswordError.textContent = '';
        }
    });
});</script>
</body>
</html>
