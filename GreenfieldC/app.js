const express = require("express");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Middleware: CSRF-Token generieren
app.use((req, res, next) => {
  if (!req.cookies.csrfToken) {
    const token = crypto.randomBytes(32).toString("hex");
    res.cookie("csrfToken", token, { httpOnly: true, sameSite: "strict" });
    req.csrfToken = token;
  } else {
    req.csrfToken = req.cookies.csrfToken;
  }
  next();
});

// Route: Formular anzeigen
app.get("/", (req, res) => {
  res.send(`
        <form action="/" method="POST">
        <label for="name">Enter your name:</label>
        <input type="hidden" name="csrfToken" value="${req.csrfToken}">
        <input type="text" id="name" name="name" required>
        <button type="submit">Verschlüsseln</button>
        </form>
    `);
});

// Route: Formular auswerten
app.post("/", (req, res) => {
  if (req.body.csrfToken !== req.cookies.csrfToken) {
    return res.status(403).send("CSRF-Token ungültig!");
  }
  // XSS-Versuch erkennen und loggen
  if (/<script.*?>.*?<\/script>/i.test(req.body.name)) {
    console.warn(`XSS-Versuch erkannt von IP ${req.ip}: ${req.body.name}`);
  }
  const name = escapeHtml(req.body.name);

  // Antwort mit verschlüsselndem Skript
  res.send(`
    <div>Name "${name}" received!</div>
    <div id="encrypted"></div>
    <div id="decrypted"></div>
    <script>
      (async () => {
        const text = ${JSON.stringify(req.body.name)};
        // Schlüssel generieren
        const key = await window.crypto.subtle.generateKey(
          { name: 'AES-GCM', length: 256 },
          true,
          ['encrypt', 'decrypt']
        );
        // Text in Uint8Array umwandeln
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        // IV generieren
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        // Verschlüsseln
        const encrypted = await window.crypto.subtle.encrypt(
          { name: 'AES-GCM', iv },
          key,
          data
        );
        // Ausgabe als Base64
        function arrayBufferToBase64(buffer) {
          let binary = '';
          const bytes = new Uint8Array(buffer);
          for (let b of bytes) binary += String.fromCharCode(b);
          return window.btoa(binary);
        }
        document.getElementById('encrypted').innerText =
          'Verschlüsselt (Base64): ' + arrayBufferToBase64(encrypted);

        // Entschlüsseln
        const decryptedBuffer = await window.crypto.subtle.decrypt(
          { name: 'AES-GCM', iv },
          key,
          encrypted
        );
        const decoder = new TextDecoder();
        const decryptedText = decoder.decode(decryptedBuffer);
        document.getElementById('decrypted').innerText =
          'Entschlüsselt: ' + decryptedText;
      })();
    </script>
    <a href="/">Zurück</a>
  `);
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
