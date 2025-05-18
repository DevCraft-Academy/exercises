const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = 3000;
const STATIC_DIR = "public";
const ALLOWED_ORIGINS = [
  "http://lokale-seite-eins:3000",
  "http://lokale-seite-zwei:3000",
];

const isRequestInBaseDir = (requestedPath, basePath) =>
  requestedPath.startsWith(basePath); // man kann nicht zurück in der Ordnerstruktur. Req pfad mmuss mit basePath starten

const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin; // liest origin des clients aus
  console.log('origin: ', origin)
  if (ALLOWED_ORIGINS.includes(origin)) { // vergleicht origin mit erlaubten origins
    res.setHeader("Access-Control-Allow-Origin", origin); // schickt ACAO für die url mit --> Browser lässt response durch
  }
};

const setCacheHeaders = (res, data) => {
  const fileHash = crypto.createHash("sha256").update(data).digest("hex");
  res.setHeader("ETag", fileHash); // etag um später zu prüfen, ob sich die Datei geändert hat, mit If-None_match
  res.setHeader("Cache-Control", "public, max-age=31536000"); // in Kombi mit ETag, wenn der neu ist, dann ist das ungültig
};

const handleCookies = (req, res) => {
  if (!req.headers.cookie || !req.headers.cookie.includes("uniqueId")) {
    const uniqueId = crypto.randomBytes(16).toString("hex");
    res.cookie("uniqueId", uniqueId, { httpOnly: true }); // wenn keine id im cookie gesetzt ist, wird eine gesetzt. Dies kann nicht mit JavaScript ausgelesen werden
    console.log(`Set uniqueId cookie: ${uniqueId}`);
  } else {
    const match = req.headers.cookie.match(/uniqueId=([a-f0-9]{32})/); 
    if (match) {
      console.log(`Received uniqueId cookie: ${match[1]}`);
    }
  }
};

const serveStaticFilesMiddleware = (baseDir = STATIC_DIR) => {
  return (req, res, next) => {
    const requestedPath = path.join(__dirname, req.path); // den Pfad will user auslesen
    const basePath = path.join(__dirname, baseDir); // Das ist das root verzeichnis

    if (!isRequestInBaseDir(requestedPath, basePath)) { // reqPfad muss im gleichen Verzeichnis wie der vorgegebene Base PFad sein, sonst abbruch
      return next();
    }

    setCorsHeaders(req, res);

    fs.readFile(requestedPath, (err, data) => { // Datei wird geholt
      if (err) {
        if (err.code === "ENOENT") {
          return next();
        }
        return next(err);
      }

      setCacheHeaders(res, data);
      handleCookies(req, res);

      fs.stat(requestedPath, (err, stats) => {
        if (!err && stats.mtime) {
          res.setHeader("Last-Modified", stats.mtime.toUTCString()); // es wird ausgelesen, wann die Datei zuletzt geändert wurde und an header geschickt
        }

        res.send(data); // Datei wird verschickt. Kommt aber nur an wenn cors passt ;-)
      });
    });
  };
};

app.use(serveStaticFilesMiddleware());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});