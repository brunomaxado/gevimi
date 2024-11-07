import db from "../config/db.js";


export const getProdutos = (req, res) => {
  const q = "SELECT * FROM produto";

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getAllProdutos = (req, res) => {
  const q = `
    SELECT 
   *
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
  // Primeiro, verifica se o nome já existe
  const checkQuery = "SELECT * FROM produto WHERE nome = ?";
  
  db.query(checkQuery, [req.body.nome], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length > 0) {
      // Se encontrar um produto com o mesmo nome, retorna uma mensagem de erro específica
      return res.status(400).json({ message: "Esse nome já está sendo usado." });
    }
    
    // Caso o nome não exista, prossegue para inserir o novo produto
    const insertQuery =
      "INSERT INTO produto(`nome`, `descricao`, `preco_unitario`, `fk_id_categoria`) VALUES (?)";
      
    const values = [
      req.body.nome,
      req.body.descricao,
      req.body.preco_unitario,
      req.body.fk_id_categoria,
    ];

    db.query(insertQuery, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Produto foi criado.");
    });
  });
};

export const deleteProduto = (req, res) => {
  // Verifica se o produto está sendo referenciado em pedidos
  const checkQuery = "SELECT * FROM item_pedido WHERE fk_id_produto = ?"; // Substitua 'item_pedido' pela tabela correta

  db.query(checkQuery, [req.params.id_produto], (err, data) => {
    if (err) return res.status(500).json(err);

    // Se o produto estiver sendo referenciado em pedidos, retorna erro
    if (data.length > 0) {
      return res.status(400).json({ message: "Não é possível deletar o produto pois ele está sendo referenciado em um pedido." });
    }

    // Se não houver referências, pode deletar o produto
    const deleteQuery = "DELETE FROM produto WHERE id_produto = ?";

    db.query(deleteQuery, [req.params.id_produto], (err, result) => {
      if (err) return res.status(500).json(err);
      
      // Verifica se alguma linha foi afetada (ou seja, se o produto foi deletado)
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Produto não encontrado." });
      }

      return res.status(200).json({ message: "Produto deletado com sucesso." });
    });
  });
};


export const updateProduto = (req, res) => {
  const produtoId = req.params.id_produto;
  const { nome, descricao, preco_unitario, fk_id_categoria } = req.body;

  // Passo 1: Verificar se já existe um produto com o mesmo nome, excluindo o produto atual
  const checkNomeQuery =
    "SELECT * FROM produto WHERE nome = ? AND id_produto != ?";

  db.query(checkNomeQuery, [nome, produtoId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    // Passo 2: Se o nome já estiver em uso
    if (result.length > 0) {
      return res.status(400).json({ message: "Nome de produto já está em uso." });
    }

    // Passo 3: Caso o nome não esteja em uso, executar a atualização
    const updateQuery =
      "UPDATE produto SET `nome`=?, `descricao`=?, `preco_unitario`=?, `fk_id_categoria`=? WHERE `id_produto` = ?";

    const values = [nome, descricao, preco_unitario, fk_id_categoria];

    db.query(updateQuery, [...values, produtoId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Produto foi atualizado.");
    });
  });
};
