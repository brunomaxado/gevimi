import db from "../config/db.js";



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
