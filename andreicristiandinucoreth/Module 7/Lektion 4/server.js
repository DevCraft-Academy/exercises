const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3000;
const CORS_ORIGINS = ['lokale-seite-eins:3000', 'lokale-seite-zwei:3000'];

const customServeFilesMiddleware = (fileDirectory) => (req, res, next) => {

    // Check that file path is allowed
    const reqPath = path.join(__dirname, req.path);
    const allowedPath = path.join(__dirname, fileDirectory) + '\\'; // without trailing slash it could match other directory with similar name
    if (!(reqPath).startsWith(allowedPath)) {
        return res.status(403).send('Access denied');
    }

    // CORS - set headers for allowed origins
    const origin = req.headers.origin;
    if (CORS_ORIGINS.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Get file and check if it exists
    fs.readFile(reqPath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).send('File not found');
            }
            return res.status(500).send(err);
        }

        // Cache - set Last Modified header
        try {
            const stats = fs.statSync(reqPath);
            const lastModified = stats.mtime.toUTCString();
            res.setHeader('Last-Modified', lastModified);
            res.setHeader('Cache-Control', 'public, max-age=3600');
        }
        catch (err) {
            return res.status(500).send(err);
        }

        // Cookies
        if (!req.headers.cookie?.includes('sessionId')) {
            const sessionId = crypto.randomUUID();
            res.cookie('sessionId', sessionId, { httpOnly: true });
            console.log(`Set new SessionId cookie: ${sessionId}`);
        } else {
            const cookies = req.headers.cookie.split("; ").reduce((prev, current) => {
                const [name, value] = current.split("=");
                prev[name] = value;
                return prev;
              }, {});
            const { sessionId } = cookies;


            console.log(`SessionId cookie already set: ${sessionId}`);
        }


        // Send file
        res.send(data);
        console.log(`Serving file: ${req.path}`);
    })

}

app.use(customServeFilesMiddleware('public'));

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});