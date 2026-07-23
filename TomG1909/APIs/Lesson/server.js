const books = [
  { id: 1, titel: "Der Alchimist", autor: "Paulo Coelho" },
  { id: 2, titel: "1984", autor: "George Orwell" },
];

const express = require("express");
const morgan = require("morgan");
const secretApiKey = "meinSuperGeheimerKey123";
const app = express();
const PORT = 3000;
app.use(morgan("combined")); // "combined"-Format für ausführliches Logging
// app.use(morgan("dev")); // kompaktes, farbiges Dev-Logging
// app.use(morgan('tiny'));       // minimalistische Logs
// app.use(morgan('short'));      // kurze Version, mehr Infos als tiny
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== secretApiKey) {
    return res.status(403).json({ error: "Ungültiger API-Key" });
  }
  next();
});

app.use(express.json());

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json("Buch nicht gefunden");
  } else {
    res.json(book);
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
