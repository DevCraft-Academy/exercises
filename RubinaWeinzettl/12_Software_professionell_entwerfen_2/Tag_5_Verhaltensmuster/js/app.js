import {
  EmailValidation,
  PasswordValidation,
  PhoneValidation,
} from './validationStrategies.js';
import { ValidatorContext } from './validatorContext.js';

// mapping input fields to their respective strategies
const fieldStrategies = {
  email: new EmailValidation(),
  password: new PasswordValidation(),
  phone: new PhoneValidation()
};

const form = document.getElementById('registrationForm');
const validator = new ValidatorContext(); // Reusable context instance

// validates user input and handles error messages
function validateField(field) {
  const strategy = fieldStrategies[field.name];
  if (!strategy) return;

  validator.setStrategy(strategy);
  const { isValid, message } = validator.validate(field.value);

  const errorMsg = field.nextElementSibling;
  if (!isValid) { // if input is not valid display error message
    field.classList.add('invalid');
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
  } else {
    field.classList.remove('invalid'); // if input is valid remove error message
    errorMsg.textContent = '';
    errorMsg.style.display = 'none';
  }
  return isValid;
}

// validation on blur: when user leaves input field, the field is validated
form.querySelectorAll('input').forEach((input) => {
  input.addEventListener('blur', () => validateField(input));
});

// validation on submit: validates the form again on submission 
// (needed when user clicks right on the button and doesn't change field before submission)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let isFormValid = true;

  form.querySelectorAll('input').forEach((input) => {
    const isValid = validateField(input);
    if (!isValid) isFormValid = false;
  });

  if (isFormValid) {
    alert('Die Registrierung war erfolgreich!');
    form.reset();
    form.querySelectorAll('small').forEach(el => el.style.display = 'none');
  }
});
