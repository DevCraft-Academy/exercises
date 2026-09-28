document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const submitter = document.querySelector("button[value=register]");
    const formData = new FormData(form,submitter); 
    const inputUserName = document.getElementById("username");
    const inputEmail = document.getElementById("email");
    const inputPwd = document.getElementById("pwd");
    const inputPwdConfirm = document.getElementById("confirmpwd");
    const error = document.getElementById("error");
    const success = document.getElementById("success");
    //const output = document.getElementById("output");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = inputUserName.value;
        const eMail = inputEmail.value;
        const pwd = inputPwd.value;
        const pwdConfirm = inputPwdConfirm.value;

        let isValid = true;
        
        var pwdLength = pwd.length;
        if (pwdLength < 8) {
            document.getElementById("error").innerHTML = "The password you entered is too short. Please enter a password with a minimum length of 8 characters!";
            error.classList.remove("hidden");
            isValid = false;
        }
        if (pwd !== pwdConfirm) {
            document.getElementById("error").innerHTML = "The passwords you entered do not match!";
            error.classList.remove("hidden");
            isValid = false;
        }
        if (isValid == true) {
            inputUserName.value = ""; 
            inputEmail.value = ""; 
            inputPwd.value = ""; 
            inputPwdConfirm.value = ""; 
            error.classList.add("hidden");
            success.classList.remove("hidden");
        }  
    });
});    