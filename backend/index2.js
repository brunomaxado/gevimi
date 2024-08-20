import express from "express"
import mysql from "mysql"
import cors from "cors"
const app = express()

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gevimi",
  });

  app.get("/", (req, res) => {
    res.json("hello");
  });
  
  app.get("/books", (req, res) => {
    const q = "SELECT * FROM produto";

    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });
  
  app.get("/books/:id_produto", (req, res) => {
    const id = req.params.id_produto;
    const q = "SELECT * FROM produto WHERE id_produto = ?";
    db.query(q, [id], (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      if (data.length === 0) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
      return res.json(data[0]);
    });
  });
  
  
  app.post("/books", (req, res) => {
    const q = "INSERT INTO produto(`nome`, `descricao`, `promocao`, `preco_desconto`, preco_unitario, imagem, fk_id_categoria) VALUES (?)";
  
    const values = [
        req.body.nome,             // nome
        req.body.descricao,        // descricao
        req.body.promocao,         // promocao
        req.body.preco_desconto,   // preco_desconto
        req.body.preco_unitario,   // preco_unitario
        req.body.imagem,           // imagem
        req.body.fk_id_categoria   // fk_id_categoria
      ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  


  app.delete("/books/:id_produto", (req, res) => {
    const bookId = req.params.id_produto;
    const q = " DELETE FROM produto WHERE id_produto = ? ";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  app.put("/books/:id_produto", (req, res) => {
    const bookId = req.params.id_produto;
    const q = `
      UPDATE produto 
      SET 
        nome = ?, 
        descricao = ?, 
        promocao = ?, 
        preco_desconto = ?, 
        preco_unitario = ?, 
        imagem = ?, 
        fk_id_categoria = ?
      WHERE 
       id_produto = ?
    `;
  
    const values = [
      req.body.nome,            // nome
      req.body.descricao,       // descricao
      req.body.promocao,        // promocao
      req.body.preco_desconto,  // preco_desconto
      req.body.preco_unitario,  // preco_unitario
      req.body.imagem,          // imagem
      req.body.fk_id_categoria  // fk_id_categoria
    ];
  
    db.query(q, [...values, bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  app.get("/categoria", (req, res) => {
    const q = "SELECT * FROM categoria";

    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });


app.listen(8800, () => {
    console.log("Conectado ao backend gevimi");
  });