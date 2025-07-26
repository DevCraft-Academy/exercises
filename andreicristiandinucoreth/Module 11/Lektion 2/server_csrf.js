const express = require('express');
const app = express();
const PORT = 3000;

const FORM = 
    `<form action="/submit" method="POST">
        <input type="text" name="name" placeholder="Enter your name" required>
        <button type="submit">Submit</button>
    </form>`;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(FORM);
});

app.post('/submit', (req, res) => {
    const name = req.body.name;
    console.log(`Received name: ${name}`);
    res.send(`Hello, ${name}!`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});