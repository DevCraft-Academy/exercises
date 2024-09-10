// JavaScript code with intentional errors
// Änderungen siehe unten
function addNumbers(num1, num2) {
 return num1 + num2;
}

function subtractNumbers(num1, num2) {
 return num1 - num2;
}

document.getElementById("addButton").addEventListener("click", () => {
 const num1 = parseFloat(document.getElementById("num1").value);
 const num2 = parseFloat(document.getElementById("num2").value);

 if (!isNaN(num1) && !isNaN(num2)) {
  const result = addNumbers(num1, num2);
  document.getElementById("result").textContent =
   "Result: " + result;
 } else {
  isNaN(num1) ? document.getElementById('num1').placeholder = 'Enter a valid number...' : null;
  isNaN(num2) ? document.getElementById('num2').placeholder = 'Enter a valid number...' : null;
  document.getElementById("result").textContent = 'Check your inputs for validity!!!'
 }
});

document.getElementById("subtractButton").addEventListener("click", () => {
 const num1 = parseFloat(document.getElementById("num1").value);
 const num2 = parseFloat(document.getElementById("num2").value);

 if (!isNaN(num1) && !isNaN(num2)) {
  const result = subtractNumbers(num1, num2);
  document.getElementById("result").textContent =
   "Result: " + result;
 } else {
  document.getElementById("result").textContent =
   "Result: Please enter valid numbers.";
 }
});

/* Änderungen:
1. If check ob eingegebene Werte Nummern sind bzw. nicht leer sind.
2. Falls keine gültige Zahl eingegeben wurde, wird eine Fehlernachricht als neuer placeholder im Input Feld angezeigt.
3. Falls keine gültige Zahl eingegeben wurde, wird eine Fehlernachricht  zusätzlich am Ende angezeigt
*/