const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(apiKeyInheader);

const PORT = 3000;
const API_KEY = 'not-so-secret-just-for-testing';
const BOOKS = [
  { id: 1, title: 'Der Alchimist', author: 'Paulo Coelho' },
  { id: 2, title: '1984', author: 'George Orwell' },
];

app.get('/books', (req, res) => {
  res.json(BOOKS);
});

app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = BOOKS.find((b) => b.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Resource not found' });
  }
});

function apiKeyInheader(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
}

app.listen(PORT, () => {
  console.log(`App is listening: http://localhost:${PORT}`);
});

/**
Reflexion:

Wie hat die Hinzufügung von Middleware deine API beeinflusst?
- Request wird vorher geprüft
- Trennung von Verantwortlichkeiten
- Logging hilft beim Debuggen


Wie könntest du die Header-Prüfungs-Middleware verbessern oder erweitern?
- API-Key in .env auslagern
- Requests genauer zu protokollieren

Was könntest du noch mit Middleware in deiner API machen?
- Logs nicht nur in der Konsole auszugeben, sondern zusätzlich in Dateien zu speichern
- Unterschiedliche Logs je nach Statuscode zu behandeln, z. B. erfolgreiche Requests in der Konsole und Fehler in einer Log-Datei
- Zentrales Error-Handling zu implementieren, um Fehler einheitlich zu behandeln
- CORS-Regeln zu definieren, um festzulegen, von welchen Origins aus auf die API zugegriffen werden darf

**/
