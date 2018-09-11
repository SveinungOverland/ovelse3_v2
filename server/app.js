const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const app = express();
app.use(express.static('build'));
app.use(bodyParser.json());


// MySQL init
const pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "sveinuov",
    password: "44joRTCx",
    database: "sveinuov",
    debug: false
});



// LOGIN

function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') // Convert to hex format
        .slice(0,length); // Return required number of characters
}

function sha256(password, salt) {
    let hash = crypto.createHmac('sha256', salt);
    hash.update(password);
    return hash.digest('hex');
}

function generateHashPassword(password) {
    let salt = genRandomString(16);
    let passwordHash = sha256(password, salt);
    return {
        salt: salt,
        hash: passwordHash
    }
}

// LOGIN END


// Burde vært ekte sertifikat, lest fra config...
const privateKey = (publicKey = "byDis");




// Håndterer login og sender JWT-token tilbake som JSON
app.post("/login", (req, res) => {
    console.log("Attempting login for user: " + req.body.username);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("DB error: " + err);
            res.status(500);
            res.json({ error: "Unable to fetch db connection" });
        } else {
            connection.query(
                "SELECT * FROM users WHERE username = ?", [req.body.username],
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.status(404);
                        res.json({ error: "User doesn't exist" });
                    } else {
                        if (rows[0].password === sha256(req.body.password, rows[0].salt)) {
                            console.log("Attempt was successful");
                            let token = jwt.sign({ username: req.body.username }, privateKey, {
                                expiresIn: 60  // Expires in 1 minute
                            });
                            res.json({ jwt: token });
                        } else {
                            console.log("Attempt was unsuccessful");
                            res.status(401);
                            res.json({ error: "Not authorized" });
                        }
                    }
                }
            )
        }
    });
});


// Plasser denen MIDDLEWARE-funksjonen
// foran alle endepunktene under samme path
app.use("/api", (req, res, next) => {
    let token = req.headers["x-access-token"];

    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
            console.log("Token was NOT accepted");
            res.status(401);
            res.json({ error: "Not authorized" });
        } else {
            console.log("Token was accepted for user: " + decoded.username);
            next();
        }
    });
});

app.get("/api/person", (req, res) => {
    // TODO: Skal returnere en liste med personer
    res.json([{ name: "Heisann" }]);
});

app.get("/api/person/:personId", (req, res) => {
    // TODO: Skal returnere personen med id req.params.personId
    res.josn({ name: "Heisann" });
});

app.post("/api/person", (req, res) => {
    // TODO: SKal legge til en ny person i DB
    res.send("");
});






const port = process.env.PORT || 3000;

console.log("Listening on port: " + port);
app.listen(port);
