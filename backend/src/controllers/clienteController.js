import db from "../config/db.js";

// Controlador para obter todos os clientes
export const getClientes = (req, res) => {
  const q = "SELECT * FROM cliente";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Controlador para obter um cliente específico pelo ID
export const getCliente = (req, res) => {
  const q = "SELECT * FROM cliente WHERE id_cliente = ?";
  
  db.query(q, [req.params.id_cliente], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    
    return res.status(200).json(data[0]);
  });
};

// Controlador para adicionar um novo cliente
export const addCliente = (req, res) => {
  const q =
    "INSERT INTO cliente(`nome`, `cpf`, `celular`, `cep`, `rua`, `numero`,`cidade`, `bairro` ) VALUES (?)";

  const values = [
    req.body.nome,
    req.body.cpf,
    req.body.celular,
    req.body.cep,
    req.body.rua,
    req.body.numero,
    req.body.cidade,
    req.body.bairro,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ message: "Cliente foi criado." });
  });
};

// Controlador para deletar um cliente
export const deleteCliente = (req, res) => {
  const clienteId = req.params.id_cliente;
  const q = "DELETE FROM cliente WHERE id_cliente = ?";

  db.query(q, [clienteId], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    return res.status(200).json({ message: "Cliente foi deletado." });
  });
};

// Controlador para atualizar um cliente
export const updateCliente = (req, res) => {
  const clienteId = req.params.id_cliente;
  const q =
    "UPDATE cliente SET `nome`=?, `cpf`=?, `celular`=?, `cep`=?, `rua`=?, `numero`=?, `cidade`=?, `bairro`=? WHERE `id_cliente` = ?";

  const values = [
    req.body.nome,
    req.body.cpf,
    req.body.celular,
    req.body.cep,
    req.body.rua,
    req.body.numero,
    req.body.cidade,
    req.body.bairro,
  ];

  db.query(q, [...values, clienteId], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    return res.status(200).json({ message: "Cliente foi atualizado." });
  });
};
