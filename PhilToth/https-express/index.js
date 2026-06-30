const express = require('express');
const https = require('node:https');
const fs = require('node:fs');
const helmet = require('helmet');

const app = express();
const port = 3000;
const httpsPort = 3001;

const options = {
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('cert.crt'),
};

// redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.protocol === 'http') {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// Content Security Policy
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", 'https://fonts.googleapis.com'],
    fontSrc: ["'self'", 'https://fonts.gstatic.com'],
    imgSrc: ["'self'", 'data:'],
    connectSrc: ["'self'"],
    frameAncestors: ["'none'"],
    upgradeInsecureRequests: []
  }
}));

// hsts
app.use(helmet.hsts({
  maxAge: (60 * 60 * 24 * 365) * 2, // 2 years in seconds
  includeSubDomains: true,
  preload: true
}));

// start https server
https.createServer(options, app).listen(httpsPort, () => {
  console.log(`<abbr title="Hypertext Transfer Protocol Secure">HTTPS</abbr> server running on port ${httpsPort}`);
});

// http server
app.listen(port, () => {
  console.log(`HTTP server running on port ${port}`);
});