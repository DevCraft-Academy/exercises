const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3000;
const API_KEY = "7A67h39cdA3T51mxc30kd";

const books = [
  { id: 1, titel: "Der Alchimist", autor: "Paulo Coelho" },
  { id: 2, titel: "1984", autor: "George Orwell" },
];

app.use(morgan("combined"));

app.use(express.json());

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

app.use(apiKeyMiddleware);

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
});

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

app.listen(PORT, () => {
  console.log(`Der Server läuft auf http://localhost:${PORT}/books`);
});
