const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Eine einfache In-Memory-Buch-Datenbank
let books = [
    { id: 1, title: "1984", author: "George Orwell" },
];

let nextId = 2;

app.use(bodyParser.json());

// GET-Route für ein Buch
app.get("/book/:id", (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send("Buch nicht gefunden");
    }
    res.json(book);
});

// DELETE-Route für ein Buch
app.delete('/book/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    const book = books.find(b => b.id === id)
    if (!book) return res.status(404).send('Buch nicht gefunden')
    books = books.filter(b => b.id !== id)
    res.json(book)
})

// Post-Route zum Hinzufügen eines Buches
app.post("/book", (req, res) => {
    if (!req.body.title || !req.body.author) {
        return res.status(400).send("Titel oder Autor fehlt");
    }
    const newBook = {
        id: generateId(),
        title: req.body.title,
        author: req.body.author,
    };
    books.push(newBook);
    return res.status(201).json(newBook);
});

// Route, um alle Bücher abzurufen
app.get("/books", (req, res) => {
    if(!books) {
        return res.status(400).send("Keine Bücher vorhanden");
    }
    res.json(books);
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});

function generateId() {
    if (!books.length) return nextId = 1;
    const maxId = books.reduce((m, b) => Math.max(m, b.id), 0);
    return nextId = maxId + 1;
}

module.exports = app;