// concrete validation strategies

export class EmailValidation {
  validate(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(value);
    return {
      isValid,
      message: isValid ? '' : 'Bitte geben Sie eine valide E-Mail-Adresse ein!'
    };
  }
}

export class PasswordValidation {
  validate(value) {
    const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value);
    return {
      isValid,
      message: isValid
        ? ''
        : 'Das Passwort muss mindestens 6 Zeichen enthalten, bestehend aus Zahlen und Buchstaben.'
    };
  }
}

export class PhoneValidation {
  validate(value) {
    const regex = /^\+?\d{7,15}$/;
    const isValid = regex.test(value);
    return {
      isValid,
      message: isValid ? '' : 'Bitte geben Sie eine gültige Telefonnummer ein!'
    };
  }
}
