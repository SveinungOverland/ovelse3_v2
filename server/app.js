const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();


app.get('/', function (req, res) {
    res.json({message: 'OI, WUTH'});
});

console.log("Listening on port 9000");
app.listen(9000);
