// server-protected.js
const express = require('express');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CSRF protection using cookie-based secret
const csrfProtection = csurf({ cookie: true });

app.get('/', csrfProtection, (req, res) => {
  // req.csrfToken() erzeugt einen Token, den wir in das Formular einbetten
  res.send(`
    <h1>Formular (PROTECTED)</h1>
    <form method="POST" action="/submit">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}">
      <label>Name: <input name="name" required></label>
      <button type="submit">Senden</button>
    </form>
  `);
});

// csrfProtection prüft den Token automatisch; fehlt/ungültig -> Fehler
app.post('/submit', csrfProtection, (req, res) => {
  console.log('EINGEGANGENER NAME (geschützt):', req.body.name);
  res.send('Danke, sicher empfangen!');
});

// Fehlerhandler für fehlerhafte/missing CSRF-Tokens
app.use((err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') {
    res.status(403).send('Ungültiger CSRF Token — Aktion verweigert.');
  } else {
    next(err);
  }
});

app.listen(3000, () => console.log('Protected app läuft: http://localhost:3000'));
