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


function loginOk(username, password) {
    console.log("Attempting login for user: " + username);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("DB error: " + err);
            return false;
        } else {
            connection.query(
                "SELECT * FROM users WHERE username = ?", [username],
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        return false;
                    } else {
                        console.log(rows[0].password, typeof rows[0].password);
                        console.log("hash", sha256(password, rows[0].salt), typeof sha256(password, rows[0].salt));
                        if (rows[0].password === sha256(password, rows[0].salt)) {
                            console.log(rows[0].password === sha256(password, rows[0].salt));
                            return true
                        }
                    }
                }
            )
        }
    });
}



// Håndterer login og sender JWT-token tilbake som JSON
app.post("/login", (req, res) => {
    if (loginOk(req.body.username, req.body.password) === true) {
        console.log("Login attempt was successful");

        let token = jwt.sign({ username: req.body.username }, privateKey, {
            expiresIn: 60 // Expires in 1 minute
        });

        res.json({ jwt: token });
    } else {
        console.log("Login attempt was unsuccessful");

        res.status(401);
        res.json({ error: "Not authorized" });
    }
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
