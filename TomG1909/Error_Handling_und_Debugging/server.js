const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Bücher-Datenbank in app.locals speichern, damit Tests sie resetten können
app.locals.books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "Brave New World", author: "Aldous Huxley" },
];
app.locals.nextId = Math.max(...app.locals.books.map((b) => b.id)) + 1;

app.use(bodyParser.json());

// GET-Route für ein Buch
app.get("/book/:id", (req, res) => {
  const books = app.locals.books;
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send("Buch nicht gefunden");
  }
  res.json(book);
});

// DELETE-Route für ein Buch
app.delete("/book/:id", (req, res) => {
  const books = app.locals.books;
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Buch nicht gefunden");
  }
  books.splice(index, 1);
  res.send("OK");
});

// POST-Route zum Hinzufügen eines Buches
app.post("/book", (req, res) => {
  const books = app.locals.books;
  let nextId = app.locals.nextId;

  if (!req.body.title || !req.body.author) {
    return res.status(400).send("Titel oder Autor fehlt");
  }

  const newBook = {
    id: nextId++,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);

  // Aktualisiere den nextId-Zähler in app.locals
  app.locals.nextId = nextId;

  res.status(201).json(newBook);
});

// Route, um alle Bücher abzurufen
app.get("/books", (req, res) => {
  res.json(app.locals.books);
});

// Server nur starten, wenn Datei direkt ausgeführt wird
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
  });
}

module.exports = app;
