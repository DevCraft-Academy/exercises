/* *  Problem: Der Code berücksichtigt die Gleitkommaungenauigkeit nicht
 * Debuggingprozess:
 * Ich habe zum Testen verschiedene Werte in Integer und Float eingegeben
 * Beim Subtrahieren von Float Numbers, kam eine falsche Zahl heraus
 * Ich gab mir zuerst den Input und das Result mit console.log aus, weil ich sehen wollte, ob es an parseFloat() liegt
 * Die Zahlen waren aber wie eingegeben und nur das Ergebnis falsch
 * dann fiel mir ein, was ich vor 10 Jahren in dem einen Semester, in dem ich studiert habe, über Floating-Point-Präzisionsfehler gelernt habe.
 * Ich suchte dann im Internet nach einer Lösung und passte den Code auf unser Beispiel an
 **/

        // Ersetzt Komma durch Punkt und entfernt nicht-numerische Zeichen außer . und -
        function sanitizeInput(value) {
            value = value.replace(',', '.').replace(/[^0-9.-]/g, '');
            return parseFloat(value) || 0;
        }
        
        // Additon mit Lösung für Gleitkommaungenauigkeit
        function addNumbers(num1, num2, decimals = 10) {
            const factor = Math.pow(10, decimals);
            return Math.round((num1 + num2) * factor) / factor;
        }
        
        // Subtraktion mit Lösung für Gleitkommaungenauigkeit
        function subtractNumbers(num1, num2, decimals = 10) {
            const factor = Math.pow(10, decimals);
            return Math.round((num1 - num2) * factor) / factor;
        }

        document.getElementById("addButton").addEventListener("click", function () {
            let input1 = document.getElementById("num1").value;
            let input2 = document.getElementById("num2").value;
            let num1 = sanitizeInput(input1);
            let num2 = sanitizeInput(input2);
            const result = addNumbers(num1, num2);
            document.getElementById("result").textContent = "Result: " + result;
        });

        document.getElementById("subtractButton").addEventListener("click", function () {
            let input1 = document.getElementById("num1").value;
            let input2 = document.getElementById("num2").value;
            let num1 = sanitizeInput(input1);
            let num2 = sanitizeInput(input2);
            const result = subtractNumbers(num1, num2);
            document.getElementById("result").textContent = "Result: " + result;
        });
        
        