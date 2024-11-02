const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

// routes / URL / endpoint utama method GET
app.use(bodyParser.json());

app.get("/", (req, res) => {
    const sql = "SELECT * FROM makanan";
    db.query(sql, (error, result) => {
        // hasil data dari mysql
        response(200, result, "get all data from makanan", res);
    });
});

app.get("/find", (req, res) => {
    const sql = `SELECT nama_lengkap FROM makanan WHERE nis = ${req.query.nis}`;
    db.query(sql, (error, result) => {
        response(200, result, "find nama sarapan", res);
    });
});

app.post("/login", (req, res) => {
    console.log({ requestFromOutside: req.body });
    res.send("login berhasil");
});

app.put("/username", (req, res) => {
    console.log({ updateData: req.body });
    res.send("update berhasil ya mas");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
