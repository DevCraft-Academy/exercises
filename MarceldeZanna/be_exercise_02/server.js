
const express = require('express');
const morgan = require('morgan');
const { SECRET_API_KEY } = require('./secret_key.js');
const app = express();
const PORT = 3000;

const books = [
  { id: 1, titel: "Der Alchimist", autor: "Paulo Coelho" },
  { id: 2, titel: "1984", autor: "George Orwell" },
];

app.use(express.json());

morgan.token('type', function (req, res) {
  return req.headers['content-type'];
});

app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}));

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});

app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== SECRET_API_KEY) {
    return res.status(403).json({ 
      error: 'Forbidden', 
      message: 'Invalid or missing API key' 
    });
  }
  
  next();
});



app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  res.json(book);
});


