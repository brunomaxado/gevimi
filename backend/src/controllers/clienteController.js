import db from "../config/db.js";

// Controlador para obter todos os clientes
export const getClientes = (req, res) => {
  const q = "SELECT * FROM cliente where data_deletado is NULL";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getAllCliente = (req, res) => {
  const q = `
  SELECT 
    (CASE 
      WHEN data_deletado IS NOT NULL 
      THEN CONCAT('[DELETADO] ', nome) 
      ELSE nome 
     END) AS nome_novo, cliente.*
  FROM cliente
`;
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

  // Tenta deletar diretamente o cliente
  const deleteClienteQuery = "DELETE FROM cliente WHERE id_cliente = ?";

  db.query(deleteClienteQuery, [clienteId], (err, data) => {
    if (err) {
      // Se ocorrer erro por FK, executa o soft delete (atualiza data_deletado)
      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        const softDeleteQuery = "UPDATE cliente SET data_deletado = NOW() WHERE id_cliente = ?";

        db.query(softDeleteQuery, [clienteId], (err, data) => {
          if (err) {
            return res.status(500).json("Erro ao realizar o soft delete do cliente.");
          }
          return res.json("Cliente não pôde ser deletado devido a dependências, mas foi marcado como deletado (soft delete).");
        });
      } else {
        // Outro tipo de erro
        return res.status(500).json("Erro ao deletar o cliente: " + err.message);
      }
    } else {
      // Caso o cliente seja deletado com sucesso
      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      return res.status(200).json({ message: "Cliente foi deletado com sucesso!" });
    }
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
