const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const fs = require("fs");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");

// Konfiguriere das öffentliche Verzeichnis
const publicDir = path.join(__dirname, "public");

// Middleware für das Bereitstellen von Dateien
const fileHostingMiddleware = (req, res, next) => {
  const filePath = path.join(publicDir, req.path);

  // Überprüfen, ob der angeforderte Pfad innerhalb des öffentlichen Verzeichnisses liegt
  if (!filePath.startsWith(publicDir)) {
    return res.status(403).send("Zugriff verweigert");
  }

  // Überprüfen, ob die Datei existiert
  fs.stat(filePath, (err, stats) => {
    if (err) {
      return res.status(404).send("Datei nicht gefunden");
    }

    // Setze Caching-Header
    const lastModified = stats.mtime.toUTCString();
    res.setHeader("Cache-Control", "public, max-age=31536000"); // 1 Jahr
    res.setHeader("Last-Modified", lastModified);

    // Setze CORS-Header
    //Achtung muss ersetzt werden '*' mit spezifischen Ursprüngen
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Setze ein Cookie mit einer einzigartigen ID
    const cookieId = req.cookies.userId || crypto.randomUUID();
    res.cookie("userId", cookieId, { httpOnly: true });
    console.log(`User ID: ${cookieId}`);

    // Sende die Datei zurück
    res.sendFile(filePath);
  });
};

// Verwende die Middleware
app.use(fileHostingMiddleware);

//Um Cookies zu verarbeiten
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
