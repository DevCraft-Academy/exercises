<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sicheres Formular</title>
    <style>
        .error {
            color: red;
        }
    </style>
    <!-- Content Security Policy (CSP) -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self';">
</head>
<body>
    <h1>Kontaktformular</h1>
    <form id="contactForm">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Dein Name" required>
        <span id="nameError" class="error"></span>
        <br><br>
        
        <label for="email">E-Mail:</label>
        <input type="email" id="email" name="email" placeholder="Deine E-Mail" required>
        <span id="emailError" class="error"></span>
        <br><br>
        
        <label for="message">Nachricht:</label>
        <textarea id="message" name="message" placeholder="Deine Nachricht" required></textarea>
        <span id="messageError" class="error"></span>
        <br><br>
        
        <button type="submit">Absenden</button>
    </form>

    <script>
        'use strict';

        (function() {
            const form = document.getElementById('contactForm');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                validateForm();
            });

            // Event-Listener für Eingabeänderungen
            form.addEventListener('input', function(event) {
                validateField(event.target);
            });

            function validateForm() {
                let isValid = true;

                const nameField = document.getElementById('name');
                const emailField = document.getElementById('email');
                const messageField = document.getElementById('message');

                if (!validateField(nameField)) isValid = false;
                if (!validateField(emailField)) isValid = false;
                if (!validateField(messageField)) isValid = false;

                if (isValid) {
                    alert('Formular erfolgreich abgesendet!');
                    form.submit();
                }
            }

            function validateField(field) {
                let isValid = true;
                const errorSpan = document.getElementById(field.id + 'Error');

                if (field.value.trim() === '') {
                    errorSpan.textContent = 'Dieses Feld ist erforderlich.';
                    isValid = false;
                } else {
                    errorSpan.textContent = '';
                }

                if (field.type === 'email' && !validateEmail(field.value)) {
                    errorSpan.textContent = 'Bitte eine gültige E-Mail-Adresse eingeben.';
                    isValid = false;
                }

                return isValid;
            }

            function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }
        })();
    </script>
</body>
</html>
