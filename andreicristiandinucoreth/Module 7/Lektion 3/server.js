const express = require('express');
const app = express();
const PORT = 3000;

const morgan = require('morgan');
const myApiKey = 'secret1234';

app.use(express.json());

app.use(morgan('combined'));

app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== myApiKey) {
        return res.status(403).json({ error: 'Invalid API Key'});
    }
    next();
})

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
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