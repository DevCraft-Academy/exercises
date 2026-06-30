const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();

function staticMiddleware(options = {}) {
  const publicDir = options.dir || path.join(__dirname, "public");
  const allowedOrigins = options.allowedOrigins || [
    "http://lokale-seite-eins:3000",
    "http://lokale-seite-zwei:3000",
    "http://localhost:3000",
  ];

  return (req, res, next) => {
    // --- CORS ---
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }

    // --- Cookies ---
    const cookieHeader = req.headers.cookie || "";
    let cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const [k, v] = c.trim().split("=");
        return [k, v];
      })
    );

    if (!cookies.userId) {
      const userId = crypto.randomUUID();
      res.setHeader("Set-Cookie", `userId=${userId}; HttpOnly; Path=/`);
      console.log("Neuer User:", userId);
    } else {
      console.log("Bekannter User:", cookies.userId);
    }

    // --- File Handling ---
    const requestedPath = decodeURIComponent(req.path);
    const filePath = path.join(publicDir, requestedPath);

    // Sicherheit: Zugriff nur innerhalb publicDir
    if (!filePath.startsWith(publicDir)) {
      res.status(403).send("Forbidden");
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.status(404).send("File not found");
        return;
      }

      // --- Caching ---
      const lastModified = stats.mtime.toUTCString();
      // ETag berechnen (Checksumme aus Größe + Änderungsdatum)
      const etag = crypto
        .createHash("md5")
        .update(stats.size + lastModified)
        .digest("hex");

      res.setHeader("Cache-Control", "public, max-age=3600");
      res.setHeader("Last-Modified", lastModified);
      res.setHeader("ETag", etag);

      // Client Cache prüfen
      if (
        req.headers["if-none-match"] === etag ||
        req.headers["if-modified-since"] === lastModified
      ) {
        res.status(304).end();
        return;
      }
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
      stream.on("error", () => {
        res.status(500).send("Server error");
      });
    });
  };
}

// --- Anwendung ---
app.use(staticMiddleware({ dir: path.join(__dirname, "public") }));

app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});
