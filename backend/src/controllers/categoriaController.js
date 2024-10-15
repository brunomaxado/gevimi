import db from "../config/db.js";

export const getCategorias = (req, res) => {
  const q = "SELECT * FROM categoria ";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getAllCategoria = (req, res) => {
   const q = `
  SELECT 
    *
  FROM categoria
`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getCategoria = (req, res) => {
  const q = "SELECT * FROM categoria WHERE id_categoria = ?";

  db.query(q, [req.params.id_categoria], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    return res.status(200).json(data[0]);
  });
};

export const addCategoria = (req, res) => {
  const q = "INSERT INTO categoria(`nome`) VALUES (?)";
  
  const values = [req.body.nome];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("Categoria foi criada.");
  });
};

export const deleteCategoria = (req, res) => {
  // Verifica se a categoria está sendo usada em produtos
  const checkQuery = "SELECT * FROM produto WHERE id_categoria = ?";
  
  db.query(checkQuery, [req.params.id_categoria], (err, data) => {
    if (err) return res.status(500).json(err);

    // Se a categoria estiver sendo referenciada em produtos, retorna erro
    if (data.length > 0) {
      return res.status(400).json({ message: "Não é possível deletar a categoria pois ela está sendo referenciada em um produto." });
    }

    // Se não houver referências, pode deletar a categoria
    const deleteQuery = "DELETE FROM categoria WHERE id_categoria = ?";
    
    db.query(deleteQuery, [req.params.id_categoria], (err, result) => {
      if (err) return res.status(500).json(err);
      
      // Verifica se alguma linha foi afetada (ou seja, se a categoria foi deletada)
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Categoria não encontrada." });
      }
      
      return res.status(200).json("Categoria deletada com sucesso.");
    });
  });
};



export const updateCategoria = (req, res) => {
  const categoriaId = req.params.id_categoria;
  const q = "UPDATE categoria SET `nome`=? WHERE `id_categoria` = ?";

  const values = [req.body.nome];

  db.query(q, [...values, categoriaId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Categoria foi atualizada.");
  });
};


