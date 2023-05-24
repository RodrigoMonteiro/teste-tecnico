const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost", // Dados do BD local
  user: "root", // Dados do BD local
  password: "Rose73Toti02!", // Dados do BD local
  database: "ecommerce", // Dados do BD local
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

// Rota para atualizar o valor de um produto específico
app.put("/products/:code", (req, res) => {
  const code = req.body.code;
  const { sales_price } = req.body;
  const sql = `UPDATE products SET sales_price = ? WHERE code = ?`;
  const values = [ sales_price, code];

  db.query(sql, values, (err, result) => {
    if (err) throw err;
    res.send("Product updated successfully");
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
