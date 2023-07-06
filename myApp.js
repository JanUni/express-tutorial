let express = require('express');
let app = express();

app.get("/name", (req, res) => {
 let { first, last } = req.query;
 console.log({"name": `${first} ${last}`});
 res.json({"name": `${first} ${last}`})
})




































 module.exports = app;
