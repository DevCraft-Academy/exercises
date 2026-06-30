const SECRET_API_KEY = "ILkpVSzfPlSXFOiQgHiJJ12hP7pLShkO";
module.exports = { SECRET_API_KEY };



// löung: JavaScript
// const morgan = require("morgan");
// const secretApiKey = "DevCraftersOnly";

// app.use(morgan("combined"));

// app.use((req, res, next) => {
//   const apiKey = req.headers["x-api-key"];
//   if (!apiKey || apiKey !== secretApiKey) {
//     return res.status(403).json({ error: "Ungültiger API-Key" });
//   }
//   next();
// });