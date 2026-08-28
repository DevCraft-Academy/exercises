 // JavaScript code with intentional errors
        function addNumbers(num1, num2) {
            return num1 + num2;
        }

        function subtractNumbers(num1, num2) {
            return num1 - num2;
        }

        function displayResult(result){
         if (result != NaN) {
                document.getElementById("result").textContent = "Result: " + result;
            } else {
                document.getElementById("result").textContent = "Bitte gültigen Wert eintragen";
            }
        }

        document.getElementById("addButton").addEventListener("click", function () {
            const num1 = parseFloat(document.getElementById("num1").value);
            const num2 = parseFloat(document.getElementById("num2").value);
            const result = addNumbers(num1, num2);
            displayResult(result)
            
        });
        
        document.getElementById("subtractButton").addEventListener("click", function () {
            const num1 = parseFloat(document.getElementById("num1").value);
            const num2 = parseFloat(document.getElementById("num2").value);
            const result = subtractNumbers(num1, num2);
            displayResult(result)
        });