require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const SECRET_API_KEY = process.env.SECRET_API_KEY;

const app = express();
const PORT = process.env.PORT || 3000;
const CONFIG = {
  DOWNLOAD_FILE_PATH: 'public/images/image.jpg',
  DOWNLOAD_FILE_NAME: '2023-08-12 14:22.jpg'
};

// DATA
const books = [
  { id: 1, titel: "Der Alchimist", autor: "Paulo Coelho" },
  { id: 2, titel: "1984", autor: "George Orwell" },
];

//CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://lokale-seite-eins:3000',
  'http://lokale-seite-zwei:3000',
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

// Auth Middleware
morgan.token('type', (req, res) => req.headers['content-type']);
app.use(morgan('combined'));

// config static data path
app.use(express.static('public', {
  maxAge: '7d',          // Browser darf die Datei bis zu 7 Tage cachen
  etag: true,            // ETag-Header aktivieren
  lastModified: true,    // Last-Modified-Header aktivieren
}));


//download Middleware
app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, CONFIG.DOWNLOAD_FILE_PATH);

  const fileBuffer = fs.readFileSync(filePath);
  const etag = crypto.createHash('sha1').update(fileBuffer).digest('hex');
  const lastModified = fs.statSync(filePath).mtime.toUTCString();

  res.set({
    'Cache-Control': 'public, max-age=86400',
    'ETag': etag,
    'Last-Modified': lastModified,
  });

  if (req.headers['if-none-match'] === etag ||
      req.headers['if-modified-since'] === lastModified) {
    return res.status(304).end();
  }

  res.download(filePath, CONFIG.DOWNLOAD_FILE_NAME, (error) => {
    if (error) {
      res.status(404).send('Datei nicht gefunden!');
    }
  });
});

app.get("/images", (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=360");
  res.send("Cache Control works");
});

//Auth
function requireApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  console.log('incoming apiKey:', apiKey);
  console.log('expected SECRET_API_KEY:', SECRET_API_KEY);
  if (!apiKey || apiKey !== SECRET_API_KEY) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Invalid or missing API key'
    });
  }
  next();
}

// Nur die /books-Routen sind geschützt
app.use('/books', requireApiKey);

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ error: 'Not found' });
  res.json(book);
});


// falls key scheitert, gib eine Warnung aus
if (!SECRET_API_KEY) {
  console.warn('WARN: SECRET_API_KEY is not set. Requests requiring the key will fail.');
}

// default Meldung auf welchen Port der Server hört
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
