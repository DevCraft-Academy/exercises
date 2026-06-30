const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const helmet = require("helmet");

const app = express();

// CSP und HSTS mit helmet konfigurieren
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'"],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 Jahr in Sekunden
      includeSubDomains: true,
      preload: true,
    },
  })
);

// Beispielroute
app.get("/", (req, res) => {
  res.send("Hello HTTPS World!");
});

// HTTPS-Server starten
const httpsOptions = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};
const httpsPort = 3443;
https.createServer(httpsOptions, app).listen(httpsPort, () => {
  console.log(`HTTPS Server läuft auf https://localhost:${httpsPort}`);
});

// HTTP-Server, der auf HTTPS umleitet
const httpPort = 3000;
http
  .createServer((req, res) => {
    const host = req.headers["host"].replace(/:\d+$/, ":" + httpsPort);
    res.writeHead(301, { Location: `https://${host}${req.url}` });
    res.end();
  })
  .listen(httpPort, () => {
    console.log(`HTTP Server läuft auf http://localhost:${httpPort} und leitet auf HTTPS um`);
  });
