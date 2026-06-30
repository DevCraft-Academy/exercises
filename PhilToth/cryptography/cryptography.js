document.addEventListener("DOMContentLoaded", (event) => {
    const sendButton = document.getElementById("sendMessage");
    sendButton.addEventListener("click", showMessages);
});

async function showMessages() {

    // generate key pair
    const message = document.getElementById("message").value;
    const keyPair = await generateKeyPair();

    // encrypt the message
    const encryptedMessage = await encrypt(message, keyPair.publicKey);
    document.getElementById("encryptedMessage").innerText = encryptedMessage;
    
    // decrypt the message
    const decryptedMessage = await decrypt(encryptedMessage, keyPair.privateKey);
    document.getElementById("decryptedMessage").innerText = decryptedMessage;
}

async function encrypt(message, publicKey) {
    encoded = new TextEncoder().encode(message);
    const encryptedBuffer = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        publicKey,
        encoded,
    );
    return btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));
}

async function decrypt(encryptedMessage, privateKey) {
    const encryptedBuffer = new Uint8Array(
        atob(encryptedMessage)
            .split("")
            .map((char) => char.charCodeAt(0))
    );

    const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        privateKey,
        encryptedBuffer,
    );
    return new TextDecoder().decode(decryptedBuffer);
}

async function generateKeyPair() {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 1024,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
        },
        true,
        ["encrypt", "decrypt"]
    );
    return keyPair;
}