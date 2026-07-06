        // damit habe ich eine XSS Injection über die GET Parameter in der URL versucht
        var testurl = new URLSearchParams(window.location.search).get('name');
        
        function isValidEmail(email) {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(email);
        }
        
        function sanitizeInput(input) {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return input.replace(/[&<>"']/g, (char) => map[char]);
        }

        function validateForm(event) {
            event.preventDefault();

            const form = document.getElementById("registerNews");
            const inputName = document.getElementById("name");
            const inputEmail = document.getElementById("email");

            const name = inputName.value;
            const email = inputEmail.value;

            let isValid = true;
            
            errorMail.textContent = "";

            if (!isValidEmail(email)) {
                document.getElementById("errorMail").innerHTML = "Bitte geben Sie eine gültige E-Mail Adresse ein!";
                errorMail.classList.remove("hidden");
                isValid = false;
            }

            if (isValid == true) {
                let sanitzedName = sanitizeInput(name);
                let sanitzedMail = sanitizeInput(email);
                let sanitzedURL = sanitizeInput(testurl);
                inputEmail.value = "";  
                errorMail.classList.add("hidden");
                success.classList.remove("hidden");
                document.getElementById("success").innerHTML = "<p>Sie haben sich erfolgreich mit diesen Daten zum Newsletter angemeldet:<p><p>" + sanitzedName + ", " + sanitzedMail +"</p><p>Die URL sieht so aus: " + sanitzedURL +"</p>";
            }
//           // Aufruf ohne Validierung für XSS Ausführung - unsicher
             //document.getElementById("success").innerHTML = "<p>Sie haben sich erfolgreich mit diesen Daten zum Newsletter angemeldet:<p><p>" + name + ", " + email +"</p>";
        }
        
        const contactForm = document.getElementById("registerNews");
        contactForm.addEventListener("submit", validateForm);

