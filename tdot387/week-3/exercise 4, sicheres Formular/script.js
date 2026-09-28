"use strict";

function validateMailAddress(mail) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(mail);
}

function validateForm(event) {
    event.preventDefault();

    const name = document.getElementById('name');
    const nameError = document.getElementById('name-error');

    const mailAddress = document.getElementById('email');
    const mailError = document.getElementById('mail-error');

    const textarea = document.getElementById('textarea');
    const textareaError = document.getElementById('textarea-error');

    const successMsg = document.getElementById('success-msg');

    if (name.value == '') {
        nameError.classList.remove('d-none');
    } else {
        nameError.classList.add('d-none');
    }

    if (!validateMailAddress(mailAddress.value)) {
        mailError.classList.remove('d-none');
    } else {
        mailError.classList.add('d-none');
    }

    if (textarea.value == '') {
        textareaError.classList.remove('d-none');
    } else {
        textareaError.classList.add('d-none');
    }

    if (validateMailAddress(mailAddress.value) && name.value != '' && textarea.value != '' ) {
        successMsg.textContent = 'Das Formular passt und kann versendet werden.';
        successMsg.classList.remove('d-none')
    } else {
        successMsg.classList.add('d-none')
    }
}

const form = document.getElementById('form');
form.addEventListener('submit', validateForm);


