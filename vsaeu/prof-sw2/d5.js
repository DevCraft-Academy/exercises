
class ValidationStrategy {
    validate(value) {
        throw new Error('validate() must be implemented');
    }
}

class RequiredStrategy extends ValidationStrategy {
    validate(value) {
        const trimmed = String(value || '').trim();
        if (!trimmed) return { valid: false, message: 'Dieses Feld ist erforderlich' };
        return { valid: true };
    }
}

class EmailStrategy extends ValidationStrategy {
    validate(value) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(String(value || ''))) {
            return { valid: false, message: 'Ungültiges E-Mail-Format' };
        }
        return { valid: true };
    }
}

class PasswordStrategy extends ValidationStrategy {
    validate(value) {
        const str = String(value || '');
        if (str.length < 8) {
            return { valid: false, message: 'Mindestens 8 Zeichen erforderlich' };
        }
        if (!/[a-zA-Z]/.test(str)) {
            return { valid: false, message: 'Mindestens ein Buchstabe erforderlich' };
        }
        if (!/[0-9]/.test(str)) {
            return { valid: false, message: 'Mindestens eine Zahl erforderlich' };
        }
        return { valid: true };
    }
}

class PhoneStrategy extends ValidationStrategy {
    validate(value) {
        const digits = String(value || '').replace(/\D/g, '');
        if (digits.length < 7) {
            return { valid: false, message: 'Ungültige Telefonnummer (mind. 7 Ziffern)' };
        }
        return { valid: true };
    }
}

// 2. FIELD VALIDATOR (Context für Strategien)
class FieldValidator {
    constructor(strategies = []) {
        this.strategies = strategies;
    }

    addStrategy(strategy) {
        this.strategies.push(strategy);
        return this;
    }

    validate(value) {
        for (const strategy of this.strategies) {
            const result = strategy.validate(value);
            if (!result.valid) return result;
        }
        return { valid: true };
    }
}

// 3. FORM VALIDATION MANAGER
class FormValidator {
    constructor(config = {}) {
        this.fields = {};
        this.config = config;
    }

    registerField(fieldName, strategies = []) {
        this.fields[fieldName] = new FieldValidator(strategies);
        return this;
    }

    validate(fieldName, value) {
        if (!this.fields[fieldName]) return { valid: true };
        return this.fields[fieldName].validate(value);
    }

    validateAll(formData) {
        const errors = {};
        for (const [fieldName, validator] of Object.entries(this.fields)) {
            const result = validator.validate(formData[fieldName] || '');
            if (!result.valid) {
                errors[fieldName] = result.message;
            }
        }
        return { isValid: Object.keys(errors).length === 0, errors };
    }
}

// 4. UI FEEDBACK HANDLER
class FormFeedback {
    showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        if (!field) return;
        
        let feedback = field.nextElementSibling;
        if (!feedback || !feedback.classList.contains('feedback')) {
            feedback = document.createElement('div');
            feedback.className = 'feedback';
            field.parentNode.insertBefore(feedback, field.nextSibling);
        }
        feedback.textContent = message;
    }

    showSuccess(fieldName) {
        const field = document.getElementById(fieldName);
        if (!field) return;
        
        let feedback = field.nextElementSibling;
        if (feedback && feedback.classList.contains('feedback')) {
            feedback.textContent = '✓ OK';
        }
    }

    clearAll() {
        document.querySelectorAll('.feedback').forEach(el => el.remove());
    }
}

// 5. SETUP & INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    // Konfiguriere Validator mit Strategies
    const validator = new FormValidator();
    
    validator
        .registerField('email', [
            new RequiredStrategy(),
            new EmailStrategy()
        ])
        .registerField('password', [
            new RequiredStrategy(),
            new PasswordStrategy()
        ])
        .registerField('phone', [
            new PhoneStrategy()
        ]);

    const feedback = new FormFeedback();
    const form = document.getElementById('contact-form');

    // On Blur Validation
    ['email', 'password', 'phone'].forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', () => {
                const result = validator.validate(fieldName, field.value);
                result.valid ? feedback.showSuccess(fieldName) : feedback.showError(fieldName, result.message);
            });
        }
    });

    // On Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            phone: document.getElementById('phone').value
        };

        const result = validator.validateAll(formData);
        
        if (result.isValid) {
            alert('Formular gültig!');
        } else {
            feedback.clearAll();
            for (const [fieldName, message] of Object.entries(result.errors)) {
                feedback.showError(fieldName, message);
            }
        }
    });
});
