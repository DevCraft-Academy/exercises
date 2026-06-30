// Reflexion:
// Wie hat die Hinzufügung von Middleware deine API beeinflusst?
// Wie könntest du die Header-Prüfungs-Middleware verbessern oder erweitern?
// Was könntest du noch mit Middleware in deiner API machen?

// Durch den x-Api-key ist meine Api deutlich sicherer
// Man kann einfacher statische assets runterladen, besser gesagt diese bereit Stellen
// Error handling, User weiß was los ist
// Error logging: ich weiß vieles über eigenede Requests

// Ich könnte sichere Passwörter nutzen oder individuelle header setzen
// mit response middleware könnte ich steuern, wer Inhalte aufrufen oder downloaden kann

//Ich könnte User authentifizieren oder Cookies auslesen
// ich könnte den Zugriff auf meinen Server gezielt einschränken


const express = require('express');
const app = express();
const PORT = 3000;
const morgan = require('morgan');
const path = require("path");

const SECRET_API_KEY = '1234';

app.use(express.json());
app.use(express.static('public'));

// Middleware zur Überprüfung des API-Keys
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.header('X-Api-Key');
  if (!apiKey || apiKey !== SECRET_API_KEY) {
    return res.status(403).json({ error: 'API Key fehlt im Header oder inkorrekt' });
  }
  next();
};

app.use(apiKeyMiddleware);

// app.use(morgan('combined'));
// app.use(morgan('common'));
app.use(morgan('dev'));

app.get("/download", (req, res) => {
  const filePath = path.join(__dirname, "public", "pommes.png");
  res.download(filePath, "pommes.png", (error) => {
    if (error) {
      res.status(404).send("Datei nicht gefunden!");
    }
  });
});

const books = [
  { id: 1, titel: "Der Alchimist", autor: "Paulo Coelho" },
  { id: 2, titel: "1984", autor: "George Orwell" },
];

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Buch nicht gefunden");
  }
});

// Der Server startet ganz zum Schluss!
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
