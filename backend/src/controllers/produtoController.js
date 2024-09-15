import db from "../config/db.js";


export const getProdutos = (req, res) => {
  const q = "SELECT * FROM produto  WHERE data_deletado IS NULL";

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getAllProdutos = (req, res) => {
  const q = `
    SELECT 
    id_produto,
      (CASE 
        WHEN data_deletado IS NOT NULL 
        THEN CONCAT('[DELETADO] ', nome) 
        ELSE nome 
       END) AS nome, descricao, preco_unitario
    FROM produto
  `;

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
    "INSERT INTO produto(`nome`, `descricao`,  `preco_unitario`,  `fk_id_categoria`) VALUES (?)";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.preco_unitario,
    req.body.fk_id_categoria,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Produto foi criado.");
  });
};

export const deleteProduto = (req, res) => {
  const produtoId = req.params.id_produto;

  // Tenta deletar diretamente o produto
  const deleteProdutoQuery = "DELETE FROM produto WHERE id_produto = ?";

  db.query(deleteProdutoQuery, [produtoId], (err, data) => {
    if (err) {
      // Se ocorrer erro por FK, executa o soft delete (atualiza data_deletado)
      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        const softDeleteQuery = "UPDATE produto SET data_deletado = NOW() WHERE id_produto = ?";
        
        db.query(softDeleteQuery, [produtoId], (err, data) => {
          if (err) {
            return res.status(500).json("Erro ao realizar o soft delete do produto.");
          }
          return res.json("Produto não pôde ser deletado devido a dependências, mas foi marcado como deletado (soft delete).");
        });
      } else {
        // Outro tipo de erro
        return res.status(500).json("Erro ao deletar o produto: " + err.message);
      }
    } else {
      // Caso o produto seja deletado com sucesso
      return res.json("Produto foi deletado com sucesso!");
    }
  });
};

export const updateProduto = (req, res) => {
  const produtoId = req.params.id_produto;
  const q =
    "UPDATE produto SET `nome`=?, `descricao`=?, `preco_unitario`=?, `fk_id_categoria`=? WHERE `id_produto` = ?";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.preco_unitario,
    req.body.fk_id_categoria,
  ];

  db.query(q, [...values, produtoId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Produto foi atualizado.");
  });
};
