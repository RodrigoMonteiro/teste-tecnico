const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());

const db = mysql.createConnection({
  host: "", // Dados do BD local
  user: "", // Dados do BD local
  password: "", // Dados do BD local
  database: "", // Dados do BD local
});


db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});

// Rota para obter todos os produtos
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Rota para obter um produto específico
app.get("/products/:code", (req, res) => {
  const sql = `SELECT * FROM products WHERE code = ${req.params.code}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Rota para obter todos os packs
app.get("/packs", (req, res) => {
  const sql = "SELECT * FROM packs";

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Rota para obter um pack específico
app.get("/packs/:id", (req, res) => {
  const sql = `SELECT * FROM packs WHERE id = ${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
