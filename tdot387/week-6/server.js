const express = require('express');
let morgan = require('morgan');
const app = express();
const PORT = 3000;

const ApiKey = 'eldenring1337';

app.use(express.json());
app.use(morgan('combined'));

app.use((req, res, next) => {
  const key = req.headers['x-api-key']
  if(key !== ApiKey) {
    return res.status(403).json({ error: "Api-Key ungültig"})
  }
  next();
});

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next(); 
});



app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});

app.get('/books', (req, res) => {
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


const books = [
  { id: 1, titel: "Der Alchimist", autor: "Paulo Coelho" },
  { id: 2, titel: "1984", autor: "George Orwell" },
];
