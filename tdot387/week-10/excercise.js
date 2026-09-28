const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const app = express();
const PORT = 3000;

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PW,
    port: process.env.PORT
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const query = `SELECT * FROM users WHERE username = ?`;
        const { rows } = await pool.query(query);

        if (rows.length > 0) {
            res.send("Erfolgreich eingeloggt!");
        }
    } catch (error) {
        console.error('Error trying to log in: ', error);
        req.send('Unable to login')
    }
});

app.get("/userdata", (req, res) => {
    if(!req.session.user) {
        console.log("Not allowed");
        return res.status(403).send("You are not allowed to access userdata")
    }
    const query = "SELECT * FROM users";
    const { rows } = pool.query(query);
    res.json(rows);
});

app.put('/username', async (req, res) => {
    if(!req.session.user) {
        console.log("Not allowed");
        return res.status(403).send("You are not allowed to change the username")
    }
    const { oldUsername, newUsername } = req.body;
    const query = `UPDATE users SET username = '${newUsername}' WHERE username = '${oldUsername}'`;
    await pool.query(query);
    res.send('Benutzername erfolgreich geändert.');
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
