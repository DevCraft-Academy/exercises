const express = require('express');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const normalizeToArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

app.get('/', (req, res) => {
  res.render('index', { name: 'username' });
});

app.post('/welcome', (req, res) => {
  console.log('request body ', req.body);
  const { username, radio, fruits } = req.body;

  res.render('welcome', {
    username,
    radio,
    fruits: normalizeToArray(fruits),
  });
});

app.listen(PORT, () => {
  console.log(`Open http://localhost:${PORT}`);
});
