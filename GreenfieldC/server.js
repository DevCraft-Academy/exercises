const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3000;
const apiKey = "123456";


const books = [
  { id: 1, titel: "Der Alchimist", autor: "Paulo Coelho" },
  { id: 2, titel: "1984", autor: "George Orwell" },
];

app.use(express.json());
app.use(morgan("combined"));

app.use((req, res, next) => {
  const apiKeyHeader = req.headers["x-api-key"];
  if (!apiKeyHeader || apiKeyHeader !== apiKey) {
    return res.status(403).send("Forbidden: Invalid or missing API key. Why");
  }
  next();
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  console.log(req.params);
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).send("Buch nicht gefunden");
  }
  res.json(book);
});


app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
