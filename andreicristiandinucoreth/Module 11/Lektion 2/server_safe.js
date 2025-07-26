const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const app = express();
const PORT = 3000;

const FORM = (csrfToken) => 
    `<form action="/submit" method="POST">
        <input type="hidden" name="_csrf" value="${csrfToken}">    
        <input type="text" name="name" placeholder="Enter your name" required>
        <button type="submit">Submit</button>
    </form>`;

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "super-secret-token",
    resave: false,
    saveUninitialized: true,
}))


app.get('/', (req, res) => {
    const csrfToken = req.session.csrfToken || (req.session.csrfToken = crypto.randomBytes(64).toString('hex'));
    req.session.csrfToken = csrfToken;
    res.send(FORM(csrfToken));
});

app.post('/submit', (req, res) => {
    if (!req.session.csrfToken || req.body._csrf !== req.session.csrfToken) {
        res.status(403).send('CSRF token mismatch');
    } else {
        const name = req.body.name;
        console.log(`Received name: ${name}`);
        res.send(`Hello, ${name}!`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});