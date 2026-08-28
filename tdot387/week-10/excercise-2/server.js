const path = require('path')
const express = require("express");
const session = require("express-session");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

const csfrToken = (req) => {
    let token = req.session.csfrToken;
    if (!token) {
        token = Math.random().toString(36).substring(2, 15);
        req.session.csfrToken = token
    }
    return token;
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.post("/form", (req, res) => {
    if(req.body._csrf !== req.session.csfrToken) {
        res.status(403).send('Token invalid');
    }
    console.log(`Dein Name: ${req.body.inputField}`);
    res.status(200).send(`Dein Name: ${req.body.inputField}`);
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
