document.addEventListener('DOMContentLoaded', function() {
    const resultSpan = document.getElementById('result');
    const nameInput = document.getElementById('name');
    const button = document.getElementById('button');
    const errorSpan = document.getElementById('error');

    button.addEventListener('click', function(event) {

        event.preventDefault();
        const name = nameInput.value;

        // Check for dangerous characters
        if (/[<>"'&]/.test(name)) {
            errorSpan.textContent = 'Input contains dangerous characters!';
            errorSpan.style.display = 'block';
            resultSpan.innerHTML = '';
        } else {
            errorSpan.style.display = 'none';
            // Make sure to sanitize the output
            resultSpan.innerHTML = sanitizeOutput(name);
        }
    });
});

function sanitizeOutput(output) {
    return output
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}