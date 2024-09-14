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



  export const deletePedido = (req, res) => {
    const pedidoId = req.params.id_pedido;
  
    // Query para deletar os itens associados ao pedido
    const queryItensPedido = "DELETE FROM item_pedido WHERE fk_id_pedido = ?";
  
    // Query para deletar o pedido
    const queryPedido = "DELETE FROM pedido WHERE id_pedido = ?";
  
    // Deletar os itens do pedido
    db.query(queryItensPedido, [pedidoId], (err, result) => {
      if (err) return res.status(500).json({ message: "Erro ao deletar os itens do pedido", err });
  
      // Deletar o pedido
      db.query(queryPedido, [pedidoId], (err, result) => {
        if (err) return res.status(500).json({ message: "Erro ao deletar o pedido", err });
  
        return res.status(200).json({ message: "Pedido e itens associados foram deletados com sucesso." });
      });
    });
  };
  

  export const getPedido = (req, res) => {
    const pedidoId = req.params.id_pedido;
  
    // Query para buscar o pedido pelo ID
    const queryPedido = `
      SELECT * 
      FROM pedido 
      WHERE id_pedido = ?
    `;
  
    // Buscar o pedido pelo ID
    db.query(queryPedido, [pedidoId], (err, pedidoData) => {
      if (err) return res.status(500).json({ message: "Erro ao buscar o pedido", err });
  
      if (pedidoData.length === 0) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }
  
      // Query para buscar os itens associados ao pedido
      const queryItensPedido = `
        SELECT * 
        FROM item_pedido 
        WHERE fk_id_pedido = ?
      `;
  
      // Buscar os itens associados ao pedido
      db.query(queryItensPedido, [pedidoId], (err, itensPedidoData) => {
        if (err) return res.status(500).json({ message: "Erro ao buscar os itens do pedido", err });
  
        // Retornar o pedido com seus itens
        return res.status(200).json({
          pedido: pedidoData[0],
          itensPedido: itensPedidoData
        });
      });
    });
  };
  export const getPedidos = (req, res) => {
    // Query para buscar todos os pedidos
    const queryPedidos = `
      SELECT * 
      FROM pedido
    `;
  
    // Buscar todos os pedidos
    db.query(queryPedidos, (err, pedidosData) => {
      if (err) return res.status(500).json({ message: "Erro ao buscar os pedidos", err });
  
      if (pedidosData.length === 0) {
        return res.status(404).json({ message: "Nenhum pedido encontrado" });
      }
  
      // Para cada pedido, buscar os itens associados
      const promises = pedidosData.map((pedido) => {
        const queryItensPedido = `
          SELECT * 
          FROM item_pedido 
          WHERE fk_id_pedido = ?
        `;
  
        return new Promise((resolve, reject) => {
          db.query(queryItensPedido, [pedido.id_pedido], (err, itensPedidoData) => {
            if (err) return reject(err);
            resolve({ ...pedido, itensPedido: itensPedidoData });
          });
        });
      });
  
      // Resolver todas as promessas e retornar os pedidos com os itens associados
      Promise.all(promises)
        .then((pedidosComItens) => {
          return res.status(200).json(pedidosComItens);
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    });
  };
  export const updatePedido = (req, res) => {


  }