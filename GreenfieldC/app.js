const express = require("express");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Middleware: CSRF-Token generieren
app.use((req, res, next) => {
  if (!req.cookies.csrfToken) {
    const token = crypto.randomBytes(32).toString("hex");
    res.cookie("csrfToken", token, { httpOnly: true, sameSite: "strict" });
    req.csrfToken = token;
  } else {
    req.csrfToken = req.cookies.csrfToken;
  }
  next();
});

// Route: Formular anzeigen
app.get("/", (req, res) => {
  res.send(`
        <form action="/submit" method="POST">
        <label for="name">Enter your name:</label>
        <input type="hidden" name="csrfToken" value="${req.csrfToken}">
        <input type="text" id="name" name="name" required>
        <button type="submit">Send</button>
        </form>
    `);
});

// Route: Formular auswerten
app.post("/submit", (req, res) => {
  if (req.body.csrfToken !== req.cookies.csrfToken) {
    return res.status(403).send("CSRF-Token ungültig!");
  }
  const name = req.body.name;
  res.send(`Name "${name}" received!`);
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
