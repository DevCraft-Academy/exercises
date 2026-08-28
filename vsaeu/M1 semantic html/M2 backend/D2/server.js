const express = require("express");
const app = express();
app.set("view engine", "ejs");
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { name: "Welt" });
});

app.post("/willkommen", (req, res) => {
  const name = req.body.name;
  const agb = req.body.agb;
  console.log("Request: ", req);
  res.render("welcome", {
    name: name,
    agb: agb,
    req: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

app.post("/kar", (req, res) => {
  res.send("<h1>Die Post Karottensalat ist da!</h1>");
});
