// Funktion zum Generieren des Schlüsselpaares
async function generateKeyPair() {
    return await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
        },
        true,
        ["encrypt", "decrypt"]
    );
}

// Funktion zur Entschlüsselung der verschlüsselten Nachricht
async function encryptMessage(message, publicKey) {
    const encoder = new TextEncoder();
    const encodedMessage = encoder.encode(message);
    const encrypted = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        encodedMessage
    );
    return encrypted;
}

// Funktion zur Verschlüsselung der Nachricht
async function decryptMessage(encryptedMessage, privateKey) {
    const decrypted = await window.crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        privateKey,
        encryptedMessage
    );
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
}

// Auslesen des Feldes, Aufruf der Ver- und Entschlüsselungsfunktion, Ausgabe in HTML
document.getElementById("submit").addEventListener("click", async (event) => {
    event.preventDefault();
    const encoded = document.getElementById("encoded");
    const decoded = document.getElementById("decoded");
    const message = document.getElementById("message").value;
    const keyPair = await generateKeyPair();
    
    const encryptedMessage = await encryptMessage(message, keyPair.publicKey);
    const textEncoded = new Uint8Array(encryptedMessage);
    
    //console.log("Verschlüsselter Text (Uint8Array):", textEncoded);
    encoded.innerHTML = textEncoded;
    encoded.value = textEncoded;
    
    const decryptedMessage = await decryptMessage(encryptedMessage, keyPair.privateKey);
    const textDecoded = decryptedMessage;
    
    //console.log("Entschlüsselter Text:", textDecoded);
    decoded.innerHTML = textDecoded;
});