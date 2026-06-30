 // JavaScript code with intentional errors
 function addNumbers(num1, num2) {
    return num1 + num2;
}

function subtractNumbers(num1, num2) {
    return num1 - num2;
}

function processInputs() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);

    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById("result").textContent = "Please enter valid numbers.";
        return;
    }
    return {num1, num2};
}

function showResult(result) {
    document.getElementById("result").textContent = "Result: " + result;
}

document.getElementById("addButton").addEventListener("click", function () {
    const {num1, num2} = processInputs()
    if (!num1 || !num2) return; 

   showResult(addNumbers(num1, num2));
});

document.getElementById("subtractButton").addEventListener("click", function () {
    const {num1, num2} = processInputs()
    if (!num1 || !num2) return; 

    showResult(subtractNumbers(num1, num2));
});