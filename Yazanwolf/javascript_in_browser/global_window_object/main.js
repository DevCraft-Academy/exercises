"use strict";

const nameInput = document.getElementById('name');
const nameError = document.getElementById('name-error');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const messageInput = document.getElementById('message');
const messageError = document.getElementById('message-error');
const registerSuccess = document.getElementById('register-success');
const formElement = document.getElementById('register-form');

const registerUser = (event) => {
    event.preventDefault();
    if (!validateInputs()) {
        registerSuccess.classList.add('hidden');
        return;
    }
    registerSuccess.classList.remove('hidden');
}

formElement.addEventListener('submit', registerUser);

nameInput.addEventListener('blur', () => {
    validateName();
});

emailInput.addEventListener('blur', () => {
    validateEmail();
});

nameInput.addEventListener('focus', () => {
    nameError.classList.add('hidden');
});
emailInput.addEventListener('focus', () => {
    emailError.classList.add('hidden');
});
messageInput.addEventListener('focus', () => {
    messageError.classList.add('hidden');
});

function validateInputs() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    return isNameValid && isEmailValid && isMessageValid;
}

function validateName() {
    if (!isNameValid()) {
        nameError.classList.remove('hidden');
        return false;
    }
    return true;
}

function validateEmail() {
    if (!isEmailValid()) {
        emailError.classList.remove('hidden');
        return false;
    }
    return true;
}

function validateMessage() {
    if (!isMessageValid()) {
        messageError.classList.remove('hidden');
        return false;
    }
    return true;
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

function isNameValid() {
    const inputValue = nameInput.value;
    return inputValue && inputValue !== '';
}

function isEmailValid() {
    const emailValue = emailInput.value;
    return emailValue && isValidEmail(emailValue);
}

function isMessageValid() {
    const messageValue = messageInput.value;
    return messageValue && messageValue.length > 0;
}