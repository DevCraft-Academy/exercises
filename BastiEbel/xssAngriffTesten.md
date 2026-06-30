// Funktion zur Bereinigung von gefährlichen Zeichen
        function reviewInput(input) {
            const element = document.createElement('div');
            element.innerText = input; // Setzt den Textinhalt, um gefährliche Zeichen zu entschärfen
            return element.innerHTML; // Gibt den bereinigten HTML-Inhalt zurück
        }

        // Funktion zur Validierung der Eingabe
        function validateInput(input) {
            const dangerousSigns = /[<>"'`]/; // Definiert gefährliche Zeichen
            return !dangerousSigns.test(input); // Gibt true zurück, wenn keine gefährlichen Zeichen vorhanden sind
        }

        // Formularverarbeitung
        document.getElementById('myForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Verhindert das Standardverhalten des Formulars

            const userInput = document.getElementById('userInput').value;
            const errorDiv = document.getElementById('error');
            errorDiv.textContent = ''; // Leert vorherige Fehlermeldungen

            // Validierung der Eingabe
            if (!validateInput(userInput)) {
                errorDiv.textContent = 'Fehler: Gefährliche Zeichen sind nicht erlaubt!';
                return; // Beendet die Funktion, wenn die Eingabe ungültig ist
            }

            // Bereinigung der Eingabe und Ausgabe
            const reviewOutput = reviewInput(userInput);
            document.getElementById('output').innerHTML = reviewOutput; // Setzt den bereinigten Inhalt
        });

        JavaScript-Funktionen:

2. Erklärung des Codes
reviewInput(input): Diese Funktion erstellt ein neues div-Element, setzt den Textinhalt auf die Benutzereingabe und gibt den HTML-Inhalt zurück. 
Dadurch werden gefährliche Zeichen in HTML-Entitäten umgewandelt, was XSS-Angriffe verhindert.

validateInput(input): Diese Funktion überprüft, ob die Eingabe gefährliche Zeichen enthält. Wenn ja, gibt sie false zurück, andernfalls true.

Ereignislistener für das Formular: Wenn das Formular abgesendet wird, wird die Standardaktion verhindert. Die Eingabe wird validiert, 
und wenn sie ungültig ist, wird eine Fehlermeldung angezeigt. Andernfalls wird die Eingabe bereinigt und im DOM angezeigt.

3. Testen des XSS-Angriffs
Öffne die HTML-Datei in einem Browser.
Gib <script>alert('XSS');</script> in das Textfeld ein und klicke auf "Absenden".
Erwartetes Ergebnis: Eine Fehlermeldung die besagt, dass gefährliche Zeichen nicht erlaubt sind.

4. Diskussion und Analyse
XSS-Prävention: Durch die Verwendung der reviewInput-Funktion wird sichergestellt, dass alle gefährlichen Zeichen in
sichere HTML-Entitäten umgewandelt werden, bevor sie im DOM angezeigt werden. Dies verhindert, dass schädlicher JavaScript-Code ausgeführt wird.

Eingabevalidierung: Die validateInput-Funktion stellt sicher, dass die Benutzereingabe keine gefährlichen Zeichen enthält, 
bevor sie verarbeitet wird. Dies bietet eine zusätzliche Sicherheitsebene, um XSS-Angriffe zu verhindern.
