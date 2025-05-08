const express = require("express");
const helmet = require("helmet");
const https = require("https");
const fs = require("fs");
const http = require("http");

const app = express();
const HTTP_PORT = 3000;

app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:"],
    },
  })
);

// Beispielroute
app.get("/", (req, res) => {
  res.send("Save URL!");
});

const httpsOptions = {
  key: fs.readFileSync("certs/key.pem"),
  cert: fs.readFileSync("certs/cert.pem"),
};

// HTTP-Server für Umleitung auf HTTPS
const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
});

app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  })
);

const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(HTTP_PORT, () => {
  console.log(`HTTP Server läuft auf http://localhost:${HTTP_PORT}`);
});
