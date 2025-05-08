<?php
    // Sicherheitsheader für PHP-Datei um XSS Angriff abzufangen

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
        <h1>Newsletter Anmeldungsformular zum Simulieren und verhindern eines XSS Angriffes</h1>
        <!-- Server und Port können aus der Action ausgelesen werden -->
        <form id="registerNews">
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
          <div id="errorMail" class="hidden"></div>
          <div id="success" class="hidden"></div>
          <input type="submit" value="Submit" value="Newsletter abonnieren">
        </form> 
    </main>
</body>

<script src="validate_form.js"></script>

