const express = require("express");
const app = express();

const PORT = 3000;

const path = require("path");
const fs = require("fs"); // Hier mit kann ich überprüfen, ob eine Datei existiert
const crypto = require("crypto");

const publicPath = path.join(__dirname, "public");
const allowedOrigins = ["http://lokale-seite-eins:3000", "http://lokale-seite-zwei:3000"];


const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
};

const handleCookies = (req, res) => {
  if (!req.headers.cookie || !req.headers.cookie.includes("uniqueId")) {
    const uniqueId = crypto.randomBytes(16).toString("hex");
    res.cookie("uniqueId", uniqueId, { httpOnly: true });
    console.log(`Set uniqueId cookie: ${uniqueId}`);
  } else {
    const match = req.headers.cookie.match(/uniqueId=([a-f0-9]{32})/);
    if (match) {
      console.log(`Received uniqueId cookie: ${match[1]}`);
    }
  }
};


/* Middleware, die eine Datei aus dem Public-Verzeichnis sendet */
sendFileFromPublic = (directory) => {
  return (req, res, next) => {
    const filePath = path.join(directory, req.path);
    if (!filePath.startsWith(directory)) {
      res.status(403).send("Forbidden");
      return;
    }

    setCorsHeaders(req, res);
       handleCookies(req, res);
    // Überprüfen, ob die Datei existiert
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.status(404).send("File Not Found");
        return;
      }

      // Set cache headers based on the file's last modified date
      fs.stat(filePath, (err, stats) => {
        if (err) {
          res.status(500).send("Internal Server Error");
          return;
        }

        const lastModified = stats.mtime.toUTCString();
        res.setHeader("Cache-Control", "public, max-age=3600");
        res.setHeader("Last-Modified", lastModified);

        res.sendFile(filePath);
      });
    });
  };
};

/* Mit app.use verwende ich die Middleware */
app.use("/public", sendFileFromPublic(publicPath));

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
