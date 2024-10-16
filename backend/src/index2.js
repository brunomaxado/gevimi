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
  
  app.get("/readProduto", (req, res) => {
    const q = "SELECT * FROM produto";

    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });
  
  app.get("/readProduto/:id_produto", (req, res) => {
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
  
  
  app.post("/readProduto", (req, res) => {
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
  


  app.delete("/readProduto/:id_produto", (req, res) => {
    const produtoId = req.params.id_produto;
    const q = " DELETE FROM produto WHERE id_produto = ? ";
  
    db.query(q, [produtoId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  app.put("/readProduto/:id_produto", (req, res) => {
    const produtoId = req.params.id_produto;
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
      req.body.nome,            
      req.body.descricao,       
      req.body.promocao,        
      req.body.preco_desconto,  
      req.body.preco_unitario,  
      req.body.imagem,          
      req.body.fk_id_categoria  
    ];
  
    db.query(q, [...values, produtoId], (err, data) => {
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

  app.post("/categoria", (req, res) => {
    const q = "INSERT INTO categoria(`nome`) VALUES (?)";
  
    const values = [
        req.body.nome,            
      ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });



  app.delete("/categoria/:id_categoria", (req, res) => {
    const categoriaId = req.params.id_categoria;
  
    const nullifyFKQuery = "UPDATE produto SET fk_id_categoria = NULL WHERE fk_id_categoria = ?";
  
    db.query(nullifyFKQuery, [categoriaId], (err, data) => {
      if (err) return res.status(500).send(err);
  
      const deleteCategoriaQuery = "DELETE FROM categoria WHERE id_categoria = ?";
  
      db.query(deleteCategoriaQuery, [categoriaId], (err, data) => {
        if (err) return res.status(500).send(err);
  
        console.log("Categoria deletada");
        return res.json(data);
      });
    });
  });
  
  
  app.put("/categoria/:id_categoria", (req, res) => {
    const produtoId = req.params.id_categoria;
    const q = `
      UPDATE categoria
      SET 
        nome = ?
      WHERE 
       id_categoria = ?
    `;
  
    const values = [
      req.body.nome,            
    ];
  
    db.query(q, [...values, produtoId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });



  app.get("/clientes", (req, res) => {
    const q = "SELECT * FROM cliente";

    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });

  app.post("/clientes", (req, res) => {
    const q = "INSERT INTO cliente(`id_cliente`, `nome`, `cpf`, `celular`, `cep`, `logradouro`, `numero`) VALUES (?)";
  
    const values = [
      req.body.id_cliente,  
      req.body.nome,        
      req.body.cpf,         
      req.body.celular,     
      req.body.cep,         
      req.body.logradouro,  
      req.body.numero       
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  app.delete("/clientes/:id_cliente", (req, res) => {
    const clienteId = req.params.id_cliente;
    const q = "DELETE FROM cliente WHERE id_cliente = ?";
  
    db.query(q, [clienteId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  app.put("/clientes/:id_cliente", (req, res) => {
    const clienteId = req.params.id_cliente;
    const q = `
      UPDATE cliente 
      SET 
        nome = ?, 
        cpf = ?, 
        celular = ?, 
        cep = ?, 
        logradouro = ?, 
        numero = ?
      WHERE 
        id_cliente = ?
    `;
  
    const values = [
      req.body.nome,         
      req.body.cpf,          
      req.body.celular,      
      req.body.cep,          
      req.body.logradouro,   
      req.body.numero        
    ];
  
    db.query(q, [...values, clienteId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  

app.listen(8800, () => {
    console.log("Conectado ao backend gevimi2");
  });