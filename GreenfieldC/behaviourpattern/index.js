// Chain of Responsibility Pattern für Validierung

class Validator {
    setNext(validator) {
        this.next = validator;
        return validator;
    }
    validate(value) {
        if (this.next) {
            return this.next.validate(value);
        }
        return { valid: true };
    }
}

// E-Mail Validatoren
class EmailFormatValidator extends Validator {
    validate(value) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(value)) {
            return { valid: false, message: "Ungültiges E-Mail-Format." };
        }
        return super.validate(value);
    }
}

// Passwort Validatoren
class PasswordLengthValidator extends Validator {
    validate(value) {
        if (value.length < 8) {
            return { valid: false, message: "Mindestens 8 Zeichen erforderlich." };
        }
        return super.validate(value);
    }
}
class PasswordAlphaNumValidator extends Validator {
    validate(value) {
        if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
            return { valid: false, message: "Passwort muss Buchstaben und Zahlen enthalten." };
        }
        return super.validate(value);
    }
}

// Telefon Validatoren
class PhoneFormatValidator extends Validator {
    validate(value) {
        // Beispiel: Deutsche Nummern (sehr einfach)
        const re = /^(\+49|0)[1-9][0-9]{8,13}$/;
        if (!re.test(value)) {
            return { valid: false, message: "Ungültiges Telefonnummernformat." };
        }
        return super.validate(value);
    }
}

// Validator-Ketten aufbauen
const emailValidator = new EmailFormatValidator();
const passwordValidator = new PasswordLengthValidator();
passwordValidator.setNext(new PasswordAlphaNumValidator());
const phoneValidator = new PhoneFormatValidator();

// Feedback-Handler
function showFeedback(input, feedbackId, result) {
    const feedback = document.getElementById(feedbackId);
    if (result.valid) {
        feedback.textContent = "✔";
        feedback.className = "feedback valid";
        input.classList.remove("invalid");
        input.classList.add("valid");
    } else {
        feedback.textContent = result.message;
        feedback.className = "feedback error";
        input.classList.remove("valid");
        input.classList.add("invalid");
    }
}

// Validierungsdispatcher
function validateField(field) {
    let validator, feedbackId;
    switch (field.id) {
        case "email":
            validator = emailValidator;
            feedbackId = "emailFeedback";
            break;
        case "password":
            validator = passwordValidator;
            feedbackId = "passwordFeedback";
            break;
        case "phone":
            validator = phoneValidator;
            feedbackId = "phoneFeedback";
            break;
        default:
            return { valid: true };
    }
    const result = validator.validate(field.value);
    showFeedback(field, feedbackId, result);
    return result;
}

// Event-Listener für Felder
["email", "password", "phone"].forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => validateField(input));
});

// Formular-Submit
document.getElementById("mainForm").addEventListener("submit", function(e) {
    let valid = true;
    ["email", "password", "phone"].forEach(id => {
        const input = document.getElementById(id);
        const result = validateField(input);
        if (!result.valid) valid = false;
    });
    if (!valid) {
        e.preventDefault();
    }
});
