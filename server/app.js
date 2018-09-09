const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();
app.use(express.static('build'));

const base = path.resolve('.');
const index = base + '/build/index.html';


app.get('/test', function (req, res) {
    res.sendFile(index);
});


const port = process.env.PORT || 3000;

console.log("Listening on port: " + port);
app.listen(port);
