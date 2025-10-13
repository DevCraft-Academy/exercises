class Validator {
  constructor(strategy) {
    this.strategy = strategy;
  }

  validate(data) {
    return this.strategy.validate(data);
  }
}

class ValidatorStrategy {
  validate(data) {
    throw new Error("This method should be overridden!");
  }
}

class EmailValidator extends ValidatorStrategy {
  validate(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data) ? "" : "Invalid email format";
  }
}

class PasswordValidator extends ValidatorStrategy {
  validate(data) {
    return data.length >= 8
      ? ""
      : "Password must be at least 8 characters long";
  }
}

class TelephoneValidator extends ValidatorStrategy {
  validate(data) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(data) ? "" : "Invalid telephone number format";
  }
}

document.getElementById("strategyForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const emailValidator = new Validator(new EmailValidator());
  const emailError = emailValidator.validate(
    document.getElementById("email").value
  );
  document.getElementById("emailError").textContent = emailError;

  const passwordValidator = new Validator(new PasswordValidator());
  const passwordError = passwordValidator.validate(
    document.getElementById("password").value
  );
  document.getElementById("passwordError").textContent = passwordError;

  const telephoneValidator = new Validator(new TelephoneValidator());
  const telephoneError = telephoneValidator.validate(
    document.getElementById("telnr").value
  );
  document.getElementById("telnrError").textContent = telephoneError;

  if (!emailError && !passwordError && !telephoneError) {
    alert("All inputs are valid!");
  }
});
