const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const helmet = require('helmet');

const app = express();
const HTTP_PORT = 8000;
const HTTPS_PORT = 8443;

// SSL Zertifikate laden
const sslOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// Helmet für Sicherheit
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true
  }
}));

// Hauptseite
app.get('/', (req, res) => {
  res.send(`
    <h1>HTTPS Server</h1>
    <p>HTTPS Port: ${HTTPS_PORT}</p>
    <p>HTTP Port: ${HTTP_PORT} (Umleitung)</p>
    <p>Features: SSL, CSP, HSTS, HTTP-Umleitung</p>
  `);
});

// HTTP zu HTTPS Umleitung
const httpApp = express();
httpApp.use((req, res) => {
  res.redirect(301, `https://localhost:${HTTPS_PORT}${req.url}`);
});

// Server starten
http.createServer(httpApp).listen(HTTP_PORT, () => {
  console.log(`HTTP Server: Port ${HTTP_PORT}`);
});

https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
  console.log(`HTTPS Server: Port ${HTTPS_PORT}`);
  console.log(`URL: https://localhost:${HTTPS_PORT}`);
});
