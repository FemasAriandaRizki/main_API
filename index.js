const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

// routes / URL / endpoint utama method GET
app.use(bodyParser.json());

app.get("/", (req, res) => {
    response(200, "API v1 ready to go", "SUCCESS", res);
});

app.get("/makanan", (req, res) => {
    const sql = `SELECT * FROM makanan`;
    db.query(sql, (err, fields) => {
        if (err) throw err
        response(200, fields, "makanan get list", res);
    });
});

app.get("/makanan/:nis", (req, res) => {
    const nis = req.params.nis
    const sql = `SELECT * FROM makanan WHERE nis = ${nis}`;
    db.query(sql, (err, fields) => {
        if (err) throw err
        response(200, fields, "get detail makanan", res);
    })
});

app.post("/makanan", (req, res) => {
    const { nis, nama_lengkap, jenis} = req.body
    const sql = `INSERT INTO makanan (nis, nama_lengkap, jenis) VALUES (${nis}, '${nama_lengkap}', '${jenis}')`
    db.query(sql, (err, fields) => {
        if (err) response (500, "invalid", "error", res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId,
            }
            response(200, data, "Data Added Successfully", res)
        }
    })
});

app.put("/makanan", (req, res) => {
    const { nis, namaLengkap, jenis } = req.body
    const sql = `UPDATE makanan SET nama_lengkap = '${namaLengkap}', jenis = '${jenis}' WHERE nis = ${nis}`

    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "error", res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                message: fields.message,
            }
            response(200, data, "Update data succesfully", res)
        } else {
            response(500, "user not found", "error", res)
        }
    })
});

app.delete("/makanan", (req, res) => {
    const { nis } = req.body
    const sql = `DELETE FROM makanan WHERE nis = ${nis}`
    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "error", res)
        if (fields?.affectedRows) {
            const data = {
                isDeleted: fields.affectedRows,
            }
            response(200, data, "Deleted Data Succesfully", res)
        } else {
            response(404, "User not found", "error", res)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
