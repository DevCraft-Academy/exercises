const express = require('express');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3001;

const FILE_URL_PATH = '/public/images/myPhoto.jpg';
const FILE_PATH = path.join(__dirname, 'public/images/myPhoto.jpg');

const ALLOWED_ORIGINS = [
  'http://lokale-seite-eins:3001',
  'http://lokale-seite-zwei:3001',
];

const handleCookies = (req, res) => {
  const cookieHeader = req.headers.cookie;

  if (!cookieHeader || !cookieHeader.includes('userId')) {
    const userId = crypto.randomBytes(16).toString('hex');
    console.log('New userId:', userId);
    res.cookie('userId', userId, { httpOnly: true });
  }
};

const corsHeaders = (req, res) => {
  const origin = req.headers.origin;
  if (!origin) return;

  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
};

const setCacheHeaders = (res) => {
  res.setHeader('Cache-Control', 'public, max-age=300');
};

app.use((req, res, next) => {
  if (req.path !== FILE_URL_PATH) {
    return next();
  }

  corsHeaders(req, res);
  handleCookies(req, res);
  setCacheHeaders(res);

  return res.download(FILE_PATH, 'myPhoto.jpg', (err) => {
    if (err && !res.headersSent) {
      res.status(404).send('File not found');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Sever is listening on port: ${PORT}`);
});
