const morgan = require('morgan');
const express = require('express');
const app = express();
const PORT = 3000;
const secret = "geheimeschluessel";

app.use(express.json());
app.use(morgan('tiny'));

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});

app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== secret) {
        return res.status(403).json({ message: "Fehler beim validieren des API-Keys!" });
    }
    next();
});

const books = [
    { id: 1, titel: "Der Alchimist", autor: "Paulo Coelho" },
    { id: 2, titel: "1984", autor: "George Orwell" },
];

// get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// get book by id
app.get('/books/:name', (req, res) => {
    const bookId = parseInt(req.params.name);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.json(book); 
    } else {
        res.status(404).json({ message: "Buch nicht gefunden" });
    }
});