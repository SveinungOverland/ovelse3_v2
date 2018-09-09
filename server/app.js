const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, 'build')));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log("Listening on port 9000");
app.listen(9000);
