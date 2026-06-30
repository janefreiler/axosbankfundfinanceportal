// Comprehensive Form Validation System

class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        this.errors = {};
        this.setupValidation();
    }

    setupValidation() {
        if (!this.form) return;

        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => this.validateField(e.target));
            input.addEventListener('change', (e) => this.validateField(e.target));
        });

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateField(field) {
        const fieldName = field.name || field.id;
        const value = field.value.trim();
        const rules = field.dataset.validation ? field.dataset.validation.split('|') : [];

        let fieldErrors = [];

        for (let rule of rules) {
            if (rule === 'required' && !value) {
                fieldErrors.push(`${fieldName} is required`);
            }
            else if (rule === 'email' && value && !this.isValidEmail(value)) {
                fieldErrors.push(`${fieldName} must be a valid email`);
            }
            else if (rule === 'phone' && value && !this.isValidPhone(value)) {
                fieldErrors.push(`${fieldName} must be a valid phone number`);
            }
            else if (rule === 'min' && value && value.length < field.dataset.min) {
                fieldErrors.push(`${fieldName} must be at least ${field.dataset.min} characters`);
            }
            else if (rule === 'max' && value && value.length > field.dataset.max) {
                fieldErrors.push(`${fieldName} must not exceed ${field.dataset.max} characters`);
            }
            else if (rule === 'password' && value && !this.isValidPassword(value)) {
                fieldErrors.push(`${fieldName} must contain uppercase, lowercase, number, and special character`);
            }
        }

        if (fieldErrors.length > 0) {
            this.errors[fieldName] = fieldErrors;
            this.showFieldError(field, fieldErrors[0]);
        } else {
            delete this.errors[fieldName];
            this.clearFieldError(field);
        }

        return fieldErrors.length === 0;
    }

    validateAllFields() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');

        let errorElement = field.parentElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.setAttribute('role', 'alert');
            field.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');

        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.validateAllFields()) {
            this.submitForm();
        } else {
            this.showError('Please fix the errors above');
        }
    }

    submitForm() {
        console.log('Form is valid, submitting...');
        // In production, send form data to server
        this.showSuccess('Form submitted successfully');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\d\-\(\)\s\+]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    isValidPassword(password) {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*]/.test(password);
        const isLongEnough = password.length >= 8;

        return hasUppercase && hasLowercase && hasNumber && hasSpecial && isLongEnough;
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            border-radius: 4px;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize form validators on page load
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => new FormValidator(form));
});