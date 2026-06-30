

class PhoneValidation extends Validation {
    validate(value) {
      const re = /^\+[1-9](2-3)+$/;
      return re.test(value) ? "" : "Ungültige Telefonnummer. Erwartet: +1234567890.";
    }
  }

class EmailValidation extends Validation {
    validate(value) {
      const re = /^\S+@\S+\.\S+$/;
      return re.test(value) ? "" : "E-Mail-Adresse ungültig";
    }
  }
  
  class PasswordValidation extends Validation {
    validate(value) {
      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)) {
        return "Passwort muss Buchstaben, Zahlen und sonderzeichen enthalten";
      }
      return "";
    }
  }

class Validation {
    validate(value) {
      throw new Error("Validation not possible");
    }
  }
  
  
  class Validator {
    constructor(strategy) {
      this.strategy = strategy;
    }
  
    validate(value) {
      return this.strategy.validate(value);
    }
  }
  
  // Anwendung des Validators
  document.getElementById('validationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validierung für jedes Feld
    const emailValidator = new Validator(new EmailValidation());
    const passwordValidator = new Validator(new PasswordValidation());
    const phoneValidator = new Validator(new PhoneValidation());
  
    const emailError = emailValidator.validate(document.getElementById('email').value);
    const passwordError = passwordValidator.validate(document.getElementById('password').value);
    const phoneError = phoneValidator.validate(document.getElementById('phone').value);
  
    // Fehler anzeigen oder Formular absenden
    document.getElementById('email-error').textContent = emailError;
    document.getElementById('phone-error').textContent = phoneError;
    document.getElementById('password-error').textContent = passwordError;
    
  
    if (!emailError && !passwordError && !phoneError) {
      // Formular absenden oder Erfolgsmeldung anzeigen
      console.log('Formular erfolgreich validiert!');
    }
  });