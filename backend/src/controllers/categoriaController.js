import db from "../config/db.js";

// Obter todas as categorias
export const getCategorias = (req, res) => {
  const q = "SELECT * FROM categoria where data_deletado is NULL";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getAllCategoria = (req, res) => {
   const q = `
  SELECT 
    id_categoria,
    (CASE 
      WHEN data_deletado IS NOT NULL 
      THEN CONCAT('[DELETADO] ', nome) 
      ELSE nome 
     END) AS nome
  FROM categoria
`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
// Obter uma categoria específica por ID
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

// Adicionar uma nova categoria
export const addCategoria = (req, res) => {
  const q = "INSERT INTO categoria(`nome`) VALUES (?)";
  
  const values = [req.body.nome];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("Categoria foi criada.");
  });
};

// Deletar uma categoria por ID
export const deleteCategoria = (req, res) => {
  const categoriaId = req.params.id_categoria;

  // Tenta deletar diretamente a categoria
  const deleteCategoriaQuery = "DELETE FROM categoria WHERE id_categoria = ?";

  db.query(deleteCategoriaQuery, [categoriaId], (err, data) => {
    if (err) {
      // Se ocorrer erro por FK, executa o soft delete (atualiza data_deletado)
      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        const softDeleteQuery = "UPDATE categoria SET data_deletado = NOW() WHERE id_categoria = ?";

        db.query(softDeleteQuery, [categoriaId], (err, data) => {
          if (err) {
            return res.status(500).json("Erro ao realizar o soft delete da categoria.");
          }
          return res.json("Categoria não pôde ser deletada devido a dependências, mas foi marcada como deletada (soft delete).");
        });
      } else {
        // Outro tipo de erro
        return res.status(500).json("Erro ao deletar a categoria: " + err.message);
      }
    } else {
      // Caso a categoria seja deletada com sucesso
      return res.json("Categoria foi deletada com sucesso!");
    }
  });
};


// Atualizar uma categoria por ID
export const updateCategoria = (req, res) => {
  const categoriaId = req.params.id_categoria;
  const q = "UPDATE categoria SET `nome`=? WHERE `id_categoria` = ?";

  const values = [req.body.nome];

  db.query(q, [...values, categoriaId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Categoria foi atualizada.");
  });
};


