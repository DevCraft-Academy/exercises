function addNumbers(num1, num2) {
  return num1 + num2;
}

function subtractNumbers(num1, num2) {
  return num1 - num2;
}

function validateInput(num, errorElementId) {
  if (isNaN(num)) {
    document.getElementById(errorElementId).style.display = "block";
    return false;
  } else {
    document.getElementById(errorElementId).style.display = "none";
    return true;
  }
}

document.getElementById("addButton").addEventListener("click", function () {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const isValidNum1 = validateInput(num1, "num1Error");
  const isValidNum2 = validateInput(num2, "num2Error");

  if (isValidNum1 && isValidNum2) {
    const result = addNumbers(num1, num2);
    document.getElementById("result").textContent = "Result: " + result;
  } else {
    document.getElementById("result").textContent = "Result: ";
  }
});

document.getElementById("subtractButton").addEventListener("click", function () {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const isValidNum1 = validateInput(num1, "num1Error");
  const isValidNum2 = validateInput(num2, "num2Error");

  if (isValidNum1 && isValidNum2) {
    const result = subtractNumbers(num1, num2);
    document.getElementById("result").textContent = "Result: " + result;
  } else {
    document.getElementById("result").textContent = "Result: ";
  }
});
