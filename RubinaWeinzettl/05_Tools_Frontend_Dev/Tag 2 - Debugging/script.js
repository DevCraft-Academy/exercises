// JavaScript code with intentional errors
        function addNumbers(num1, num2) {
            return num1 + num2;
        }

        function subtractNumbers(num1, num2) {
            return num1 - num2;
        }

        document.getElementById("addButton").addEventListener("click", function () {
            const num1 = parseFloat(document.getElementById("num1").value);
            const num2 = parseFloat(document.getElementById("num2").value);
            const result = addNumbers(num1, num2);
            document.getElementById("result").textContent = "Result: " + result;
        });

        document.getElementById("subtractButton").addEventListener("click", function () {
            const num1 = parseFloat(document.getElementById("num1").value);
            console.log(num1);
            const num2 = parseFloat(document.getElementById("num2").value);
            console.log(num2);
            const result = subtractNumbers(num1, num2);
            console.log(result);
            document.getElementById("result").textContent = "Result: " + result;
        });