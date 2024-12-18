import db from "../config/db.js";

export const getClientes = (req, res) => {
  const q = `SELECT c.*, (
        SELECT GROUP_CONCAT(frete ORDER BY data_realizado DESC)
        FROM pedido p
        WHERE c.id_cliente = p.fk_id_cliente
           AND p.tipo NOT IN (3, 4) 
              AND p.frete IS NOT NULL 
              AND p.frete != 0
        ORDER BY data_realizado DESC
        LIMIT 3
    ) AS ultimos_fretes FROM cliente c`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getAllCliente = (req, res) => {
  const q = `
  SELECT 
  *
  FROM cliente
  `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

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

export const addCliente = (req, res) => {
  const qCheckCpf = "SELECT * FROM cliente WHERE cpf = ?"; // Consulta para verificar se o CPF já existe

  db.query(qCheckCpf, [req.body.cpf], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0) {
      // Caso o CPF já esteja cadastrado
      return res.status(400).json({ message: "Este CPF já está cadastrado." });
    }

    // Se o CPF não estiver cadastrado, realiza a inserção
    const q =
      "INSERT INTO cliente(`nome`, `cpf`, `celular`, `cep`, `logradouro`, `numero`, `cidade`, `bairro`, `observacao`) VALUES (?)";

    const values = [
      req.body.nome,
      req.body.cpf,
      req.body.celular,
      req.body.cep,
      req.body.logradouro,
      req.body.numero,
      req.body.cidade,
      req.body.bairro,
      req.body.observacao, // Novo campo
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json({ message: "Cliente foi criado." });
    });
  });
};

export const updateCliente = (req, res) => {
  const clienteId = req.params.id_cliente;
  const qCheckCpf = "SELECT * FROM cliente WHERE cpf = ? AND id_cliente != ?"; // Verifica se o CPF já está cadastrado, excluindo o próprio cliente sendo editado

  db.query(qCheckCpf, [req.body.cpf, clienteId], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0) {
      // Caso o CPF já esteja cadastrado e não seja o mesmo cliente
      return res.status(400).json({ message: "Este CPF já está cadastrado." });
    }

    // Se o CPF não estiver cadastrado ou for o mesmo do cliente sendo editado, realiza a atualização
    const q =
      "UPDATE cliente SET `nome`=?, `cpf`=?, `celular`=?, `cep`=?, `logradouro`=?, `numero`=?, `cidade`=?, `bairro`=?, `observacao`=? WHERE `id_cliente` = ?";

    const values = [
      req.body.nome,
      req.body.cpf,
      req.body.celular,
      req.body.cep,
      req.body.logradouro,
      req.body.numero,
      req.body.cidade,
      req.body.bairro,
      req.body.observacao, // Novo campo
    ];

    db.query(q, [...values, clienteId], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }

      return res.status(200).json({ message: "Cliente foi atualizado." });
    });
  });
};

export const deleteCliente = (req, res) => {
  // Verifica se o cliente está sendo referenciado em pedidos
  const checkQuery = "SELECT * FROM pedido WHERE fk_id_cliente = ?";

  db.query(checkQuery, [req.params.id_cliente], (err, data) => {
    if (err) return res.status(500).json(err);

    // Se o cliente estiver sendo referenciado em pedidos, retorna erro
    if (data.length > 0) {
      return res
        .status(400)
        .json({ message: "Não é possível deletar o cliente pois ele está sendo referenciado em um pedido." });
    }

    // Se não houver referências, pode deletar o cliente
    const deleteQuery = "DELETE FROM cliente WHERE id_cliente = ?";

    db.query(deleteQuery, [req.params.id_cliente], (err, result) => {
      if (err) return res.status(500).json(err);

      // Verifica se alguma linha foi afetada (ou seja, se o cliente foi deletado)
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Cliente não encontrado." });
      }

      return res.status(200).json({ message: "Cliente deletado com sucesso." });
    });
  });
};

