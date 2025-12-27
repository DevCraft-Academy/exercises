const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const app = express();
const PORT = 3000;

const books = [
  { id: 1, titel: "Der Alchimist", autor: "Paulo Coelho" },
  { id: 2, titel: "1984", autor: "George Orwell" },
];

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
});

const STATIC_URL = "/public";
const STATIC_DIR = process.env.STATIC_DIR
  ? path.resolve(process.env.STATIC_DIR)
  : path.join(__dirname, "public");
const ALLOWED_ORIGINS = new Set([
  `http://localhost:${PORT}`,
  "http://lokale-seite-eins:3000",
  "http://lokale-seite-zwei:3000",
]);

const ensureUserIdCookie = (req, res) => {
  const rawCookie = req.headers.cookie || "";
  const existing = rawCookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("uid="));
  if (existing) return existing.split("=")[1];

  const newId = crypto.randomBytes(16).toString("hex");
  res.setHeader("Set-Cookie", `uid=${newId}; Path=/; HttpOnly; SameSite=Lax`);
  return newId;
};

app.use((req, res, next) => {
  if (!req.path.startsWith(STATIC_URL)) return next();

  const relativePath = req.path.slice(STATIC_URL.length); // z.B. /public/images/photo.jpg -> /images/photo.jpg
  const candidatePath = path.resolve(path.join(STATIC_DIR, relativePath)); // -> <projekt>/public/images/photo.jpg
  const safeRoot = path.resolve(STATIC_DIR);

  if (!candidatePath.startsWith(safeRoot)) {
    return res.status(403).send("Forbidden");
  }

  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  res.setHeader("Vary", "Origin");

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  const userId = ensureUserIdCookie(req, res);
  res.setHeader("X-User-Id", userId);

  fs.stat(candidatePath, (err, stats) => {
    if (err || !stats.isFile()) return res.status(404).send("Not found");

    fs.readFile(candidatePath, (readErr, data) => {
      if (readErr) return res.status(500).send("Internal Server Error");

      const etag = crypto.createHash("sha1").update(data).digest("hex");
      res.setHeader("ETag", etag);
      res.setHeader("Cache-Control", "public, max-age=300");
      res.setHeader("Last-Modified", stats.mtime.toUTCString());

      if (req.headers["if-none-match"] === etag) {
        return res.status(304).end();
      }

      res.sendFile(candidatePath);
    });
  });
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
