import db from "../config/db.js";

export const addPedido = (req, res) => {
    const { pedido, itensPedido } = req.body;
  
    // Query para inserir o pedido
    const queryPedido = `
      INSERT INTO pedido (tipo, forma_pagamento, observacao, data_para_entregar, data_realizado, fk_id_usuario, fk_id_cliente) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  
    const pedidoValues = [
      pedido.tipo,
      pedido.forma_pagamento,
      pedido.observacao,
      pedido.data_para_entregar,
      pedido.data_realizado,
      pedido.fk_id_usuario,
      pedido.fk_id_cliente
    ];
  
    // Inserindo o pedido
    db.query(queryPedido, pedidoValues, (err, result) => {
      if (err) return res.status(500).json(err);
  
      const pedidoId = result.insertId; // Obtém o ID do pedido inserido
  
      // Preparar as promessas para inserir cada item do pedido
      const promises = itensPedido.map((item) => {
        const queryItemPedido = `
          INSERT INTO item_pedido (quantidade, fk_id_pedido, fk_id_produto) 
          VALUES (?, ?, ?)
        `;
        const itemValues = [item.quantidade, pedidoId, item.fk_id_produto];
  
        // Retorna uma promise para cada inserção
        return new Promise((resolve, reject) => {
          db.query(queryItemPedido, itemValues, (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });
      });
  
      // Aguarda todas as promessas serem resolvidas
      Promise.all(promises)
        .then(() => {
          return res.status(200).json({ message: "Pedido e itens foram criados com sucesso." });
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    });
  };