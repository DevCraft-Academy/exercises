const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'"],
    },
  })
);
app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: false
  })
);

app.get('/', (req, res) => {
  res.send('Hello over HTTPS with CSP');
});

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

https.createServer(options, app).listen(8443, () => {
  console.log('HTTPS läuft auf https://localhost:8443');
});

const redirectApp = express();
redirectApp.use((req, res) => {
  const host = req.headers.host.split(':')[0];
  res.redirect(301, `https://${host}:8443${req.url}`);
});

http.createServer(redirectApp).listen(8080, () => {
  console.log('HTTP läuft auf http://localhost:8080 und leitet zu HTTPS um');
});
