let express = require("express");
let app = express();

/**
 * Middleware, which should do something for every request
 */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

/**
 * app.use for setting up middleware
 * express.static for serving static files
 */
app.use("/public", express.static(__dirname + "/public"));

/**
 * Deliver HTML-File
 */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

/**
 * Use .env-file
 */
app.get("/json", (req, res) => {
  isUppercase = process.env.MESSAGE_STYLE;
  isUppercase === "uppercase"
    ? res.json({ message: "HELLO JSON" })
    : res.json({ message: "Hello json" });
});

/**
 * Stack Middleware
 */
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

/**
 * Work with ROUTE-parameters
 */
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

/**
 * Work with QUERY-parameter
 */
app.get("/name", (req, res) => {
  let { first, last } = req.query;
  console.log({ name: `${first} ${last}` });
  res.json({ name: `${first} ${last}` });
});

module.exports = app;
