const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();

app.use(express.static("../client/assets/"))
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "../client/pages"));
app.set("view engine", "ejs");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "alpaca",
});

db.connect((err) => {
    if(err) {
        console.log("Database connected failed!");
    } else {
        console.log("Database connected successfully");
    }
});

app.get("/menu", (req, res) => {
    res.render("menu.ejs");
});

app.get("/menu/cari", (req, res) => {
    let name = req.query.q;

    db.query(`SELECT * FROM menu WHERE name LIKE '%${name}%'`,
    (error, results) => {
        return res.status(200).json({
            data: results,
        });

    });
});

app.get("/menu/cari/makanan", (req, res) => {
    let name = req.query.s;

    db.query(`SELECT * FROM menu WHERE name LIKE '%${name}%'`,
    (error, results) => {
        return res.status(200).json({
            data: results,
        });
    });
});

app.listen(3000, () => {
    console.log("Server running at port 3000");
});