<?php
// Redirect
if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off') {
    $redirect = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header('Location: ' . $redirect, true, 302);
    exit();
}

// CSP Header - Bilder dürfen nur von der eigenen Domain mit https geladen werden
header("Content-Security-Policy: default-src 'self'; img-src https://rubinaweinzettl.ddev.site/; object-src 'none'; frame-src 'none'; base-uri 'self'; form-action 'self'; block-all-mixed-content;");

// HSTS Header
header("Strict-Transport-Security: max-age=16070400", true);

echo "Hello World of Headers!<br><br>";

?>
<!-- Testbild - konnte nicht geladen werden-->
<!--img src="http://rubinaweinzettl.ddev.site/09_Kryptographie/Tag_2_Sichere_Kommunikation_HTTPS/italy.jpg"-->

<img src="https://rubinaweinzettl.ddev.site/09_Kryptographie/Tag_2_Sichere_Kommunikation_HTTPS/italy.jpg">



