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
  const qCheck = "SELECT * FROM categoria WHERE nome = ?";
  const values = [req.body.nome];

  // Verifica se o nome da categoria já está sendo usado
  db.query(qCheck, values, (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0) {
      return res.status(400).json({ message: "O nome da categoria já está em uso." });
    }

    const q = "INSERT INTO categoria(`nome`) VALUES (?)";

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json("Categoria foi criada.");
    });
  });
};
export const deleteCategoria = (req, res) => {
  const { id_categoria } = req.params;

  if (!id_categoria) {
    return res.status(400).json({ message: "ID da categoria não fornecido." });
  }

  console.log("Tentando deletar a categoria com ID:", id_categoria);

  // Verifica se a categoria está sendo usada em produtos
  const checkQuery = "SELECT * FROM produto WHERE fk_id_categoria = ?";

  db.query(checkQuery, [id_categoria], (err, data) => {
    if (err) {
      console.error("Erro ao verificar categoria nos produtos:", err);
      return res.status(500).json(err);
    }

    if (data.length > 0) {
      console.log("Categoria referenciada em produtos, não pode ser deletada.");
      return res.status(400).json({ message: "Não é possível deletar a categoria, pois ela está sendo referenciada em um ou mais produtos." });
    }

    // Se não houver referências, pode deletar a categoria
    const deleteQuery = "DELETE FROM categoria WHERE id_categoria = ?";

    db.query(deleteQuery, [id_categoria], (err, result) => {
      if (err) {
        console.error("Erro ao deletar categoria:", err);
        return res.status(500).json(err);
      }

      if (result.affectedRows === 0) {
        console.log("Nenhuma categoria encontrada com esse ID:", id_categoria);
        return res.status(404).json({ message: "Categoria não encontrada." });
      }

      console.log("Categoria deletada com sucesso.");
      return res.status(200).json({ message: "Categoria deletada com sucesso." });
    });
  });
};
export const updateCategoria = (req, res) => {
  const categoriaId = req.params.id_categoria;
  const newNome = req.body.nome;

  // Verifica se o novo nome é o mesmo do nome atual da categoria
  const qCurrentName = "SELECT nome FROM categoria WHERE id_categoria = ?";
  db.query(qCurrentName, [categoriaId], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }

    const currentName = result[0].nome;

    // Se o nome não mudou, retorna um erro
    if (currentName === newNome) {
      return res.status(400).json({ message: "O nome da categoria já é o mesmo." });
    }

    // Verifica se o nome da categoria editada já está em uso por outra categoria
    const qCheck = "SELECT * FROM categoria WHERE nome = ? AND id_categoria != ?";
    const values = [newNome, categoriaId];

    db.query(qCheck, values, (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.length > 0) {
        return res.status(400).json({ message: "O nome da categoria já está em uso." });
      }

      // Atualiza o nome da categoria
      const qUpdate = "UPDATE categoria SET `nome`=? WHERE `id_categoria` = ?";
      db.query(qUpdate, [newNome, categoriaId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Categoria foi atualizada.");
      });
    });
  });
};


