import db from "../config/db.js";

// Obter todas as categorias
export const getCategorias = (req, res) => {
  const q = "SELECT * FROM categoria";

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

  // Anular a fk_id_categoria de produtos que referenciam a categoria a ser deletada
  const nullifyFKQuery = "UPDATE produto SET fk_id_categoria = NULL WHERE fk_id_categoria = ?";

  db.query(nullifyFKQuery, [categoriaId], (err, data) => {
    if (err) return res.status(500).send(err);

    // Deletar a categoria após anular as chaves estrangeiras
    const deleteCategoriaQuery = "DELETE FROM categoria WHERE id_categoria = ?";

    db.query(deleteCategoriaQuery, [categoriaId], (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json("Categoria foi deletada.");
    });
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


