const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3000;

const API_KEY = "mein-geheimer-api-schluessel"; // usually stored in .env variables

const books = [
  { id: 1, titel: "Der Alchimist", autor: "Paulo Coelho" },
  { id: 2, titel: "1984", autor: "George Orwell" },
];

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
});

app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey && apiKey === API_KEY) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.use(morgan("combined"));

app.use(express.json());

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  console.log(req.params);
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Buch nicht gefunden");
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

/*
Reflexion:
Wie hat die Hinzufügung von Middleware deine API beeinflusst?


Die Middleware hat deine API robuster und sicherer gemacht. Zum Beispiel:

Die API-Key-Prüfung (Header-Middleware) verhindert unbefugten Zugriff und sorgt für Authentifizierung vor jeder Route.


Wie könntest du die Header-Prüfungs-Middleware verbessern oder erweitern?

Rate Limiting hinzufügen: Verwende Middleware wie express-rate-limit, um zu viele fehlgeschlagene Versuche zu blockieren (z.B. nach 5 Fehlern für 15 Minuten sperren).
Bessere Fehlerbehandlung: Gib detailliertere Fehlermeldungen zurück (z.B. "API-Key fehlt" vs. "API-Key ungültig") und logge fehlgeschlagene Versuche für Monitoring.

Was könntest du noch mit Middleware in deiner API machen?

CORS (Cross-Origin Resource Sharing): Erlaube Requests von bestimmten Domains mit cors-Middleware, wichtig für Frontend-Integrationen.
Kompression: Verwende compression-Middleware, um Responses zu komprimieren und Bandbreite zu sparen.
Caching: Füge Caching-Middleware hinzu (z.B. mit Redis), um häufige Requests zu beschleunigen.
...
*/
