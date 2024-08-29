import db from "../config/db.js";


export const getProdutos = (req, res) => {
  const q = "SELECT * FROM produto";

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getProduto = (req, res) => {
  const q = "SELECT * FROM produto WHERE id_produto = ?";
  
  db.query(q, [req.params.id_produto], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    
    return res.status(200).json(data[0]);
  });
};

export const addProduto = (req, res) => {
  const q =
    "INSERT INTO produto(`nome`, `descricao`, `promocao`, `preco_desconto`, `preco_unitario`, `imagem`, `fk_id_categoria`) VALUES (?)";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.promocao,
    req.body.preco_desconto,
    req.body.preco_unitario,
    req.body.imagem,
    req.body.fk_id_categoria,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Produto foi criado.");
  });
};

export const deleteProduto = (req, res) => {
  const produtoId = req.params.id_produto;
  const q = "DELETE FROM produto WHERE id_produto = ?";

  db.query(q, [produtoId], (err, data) => {
    if (err) return res.status(500).json("Você só pode deletar seu produto!");

    return res.json("Produto foi deletado!");
  });
};

export const updateProduto = (req, res) => {
  const produtoId = req.params.id_produto;
  const q =
    "UPDATE produto SET `nome`=?, `descricao`=?, `promocao`=?, `preco_desconto`=?, `preco_unitario`=?, `imagem`=?, `fk_id_categoria`=? WHERE `id_produto` = ?";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.promocao,
    req.body.preco_desconto,
    req.body.preco_unitario,
    req.body.imagem,
    req.body.fk_id_categoria,
  ];

  db.query(q, [...values, produtoId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Produto foi atualizado.");
  });
};
