const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const PORT = 3000;

app.get("/", (req, res) => {
  res.render("index", { name: "Welt"});
});

app.post("/willkommen", (req, res) => {
    console.log("POST /willkommen, body: ", req.body);
    const {name, color} = req.body;

    res.render("willkommen", {name, color});
  });

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});