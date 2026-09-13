Juice Shop

1. Identifizierung der Sicherheitsaspekte

    - über die Networktabs werden alle Daten leicht auslesbar übermittelt
    - Javascript Code ist durch ein Framework etc zerstückelt, kann also nicht ohne weiteres JS ausgelesen werden.
    

2. Überprüfung der Authentifizierung und Autorisierung

    - Logindaten werden in Klartext übermittelt
    - Tokens existieren nicht, somit auch kein OAuth
    - Adminbereich war keiner Auffindbar


3. Prüfung der Datenübertragung und -speicherung

    - HTTP statt HTTPS
    - sensible Daten unverschlüsselt und klar auslesbar im Networktab incl Passwörter und Login

4. Analyse der Eingabeverarbeitung

    - Cors existiert nicht
    - <script>alert('hello')</script> konnte nicht ausgeführt werden über das Sucheeingabefenster

5. Beurteilung von Error Handling und Logging

    - konto kann mit abweichenden passwörtern nicht erstellt werden
    - login prüfung auf email ist korrekt
    - passwort muss nicht zwingend die unten genannten Kriterien erfüllen

6. Betrachtung der externen Dependencies

    - Google Anmeldung
    - optionale Anbindung einer AI für AI chat


1. HTTPS muss zwingend umgesetzt werden mit SSL Verschlüsselung / Auth mit Token‚
2. Passwörter ohne Einhaltung der Vorgaben sperren, optimalerweise gängige Passwörter auch sperren
3. Daten komplett verschlüsselt übertragen