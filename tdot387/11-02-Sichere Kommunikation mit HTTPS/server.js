const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const express = require('express');
const helmet = require('helmet');

const app = express();

const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;

app.use(helmet({}));

app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'"],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            frameAncestors: ["'none'"],
        }
    })
);

app.use(
    helmet.hsts({
        maxAge: 60 * 60 * 24 * 7,
        includeSubDomains: false,
        preload: false,
    })
)

app.get("/", (req, res) => {
    res.type("html").send(`
        <!doctype html>
            <html>
                <head><meta charset="utf-8"><title>Secure Express</title></head>
                <body>
                    <h1>Sichere Kommunikation mit HTTPS</h1>
                    <p>Wenn du das sehen kannst, verwendest du eine sichere Verbindung.</p>
                </body>
            </html>
        `)
})

const keyPath = path.join(__dirname, "key.pem");
const certPath = path.join(__dirname, "cert.pem");

const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
}

https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS läuft jetzt auf https://localhost:${HTTPS_PORT}`)
});

http.createServer((req, res) => {
    const host = req.headers.host ? req.headers.host.split(":")[0] : "localhost";
    const target = `https://${host}:${HTTPS_PORT}${req.url}`;

    res.writeHead(301, { Location: target });
    res.end();
})
.listen(HTTP_PORT, () => {
    console.log(`HTTP läuft auf http://localhost:${HTTP_PORT} und leitet auf HTTPS um`);
})