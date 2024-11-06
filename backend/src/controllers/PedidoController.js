import db from "../config/db.js";


  export const addPedido = (req, res) => {
    const { pedido, itensPedido } = req.body;
  
    const queryPedido = `
      INSERT INTO pedido (tipo, forma_pagamento, observacao, data_para_entregar, data_realizado, frete, fk_id_usuario, fk_id_cliente) 
      VALUES (?, ?, ?, ?, ?,?, ?, ?)
    `;
  
    const pedidoValues = [
      pedido.tipo,
      pedido.forma_pagamento,
      pedido.observacao,
      pedido.data_para_entregar,
      pedido.data_realizado,
      pedido.frete,
      pedido.fk_id_usuario,
      pedido.fk_id_cliente
    ];
  
    db.query(queryPedido, pedidoValues, (err, result) => {
      if (err) return res.status(500).json(err);
  
      const pedidoId = result.insertId; 
  
      const promises = itensPedido.map((item) => {
        const queryItemPedido = `
          INSERT INTO item_pedido (quantidade, preco_unitario_atual, fk_id_pedido, fk_id_produto) 
          VALUES (?, ?, ?, ?)
        `;
        const itemValues = [item.quantidade, item.preco_unitario_atual, pedidoId, item.fk_id_produto];
  
        return new Promise((resolve, reject) => {
          db.query(queryItemPedido, itemValues, (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });
      });
  
      Promise.all(promises)
        .then(() => {
          return res.status(200).json({ message: "Pedido e itens foram criados com sucesso." });
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    });
  };



  export const getPedido = (req, res) => {
    const pedidoId = req.params.id_pedido;
  
    const queryPedido = `
      SELECT * 
      FROM pedido 
      WHERE id_pedido = ? 
    `;
  
    db.query(queryPedido, [pedidoId], (err, pedidoData) => {
      if (err) return res.status(500).json({ message: "Erro ao buscar o pedido", err });
  
      if (pedidoData.length === 0) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }
  
      const queryItensPedido = `
        SELECT * 
        FROM item_pedido 
        WHERE fk_id_pedido = ?
      `;
  
      db.query(queryItensPedido, [pedidoId], (err, itensPedidoData) => {
        if (err) return res.status(500).json({ message: "Erro ao buscar os itens do pedido", err });
  
        return res.status(200).json({
          pedido: pedidoData[0],
          itensPedido: itensPedidoData
        });
      });
    });
  };


  export const getPedidos = (req, res) => {
    const queryPedidos = `
      SELECT * 
      FROM pedido
     
    `;
  
    db.query(queryPedidos, (err, pedidosData) => {
      if (err) return res.status(500).json({ message: "Erro ao buscar os pedidos", err });
  
      if (pedidosData.length === 0) {
        return res.status(404).json({ message: "Nenhum pedido encontrado" });
      }
  
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

  export const finalizaPedido = (req, res) => {
    const pedidoId = req.params.id_pedido; 
    const q = "UPDATE pedido SET `status` = 1 WHERE `id_pedido` = ?"; 
  
    db.query(q, [pedidoId], (err, data) => {
      if (err) return res.status(500).json(err); 
      return res.json("Status do pedido atualizado com sucesso."); 
    });
  };
  
  export const getPedidoEntrega = (req, res) => {
    const queryPedidos = `
      SELECT *
      FROM pedido
      WHERE tipo <> 3 
        AND status <> 1
        AND data_para_entregar IS NOT NULL
      ORDER BY data_para_entregar ASC
    `;
  
    db.query(queryPedidos, (err, pedidosData) => {
      if (err) {
        console.error("Erro ao buscar os pedidos:", err);
        return res.status(500).json({ message: "Erro ao buscar os pedidos", error: err });
      }
  
      if (pedidosData.length === 0) {
        return res.status(404).json({ message: "Nenhum pedido encontrado" });
      }
  
      const promises = pedidosData.map((pedido) => {
        const queryItensPedido = `
          SELECT * 
          FROM item_pedido 
          WHERE fk_id_pedido = ?
        `;
  
        return new Promise((resolve, reject) => {
          db.query(queryItensPedido, [pedido.id_pedido], (err, itensPedidoData) => {
            if (err) {
              console.error(`Erro ao buscar itens do pedido ${pedido.id_pedido}:`, err);
              return reject(err);
            }
  
            resolve({ 
              ...pedido, 
              itensPedido: itensPedidoData,
              tempo_ate_entrega: {
                dias: pedido.dias_ate_entrega,
                horas: pedido.horas_ate_entrega
              }
            });
          });
        });
      });
  
      Promise.all(promises)
        .then((pedidosComItens) => {
          return res.status(200).json(pedidosComItens);
        })
        .catch((err) => {
          console.error("Erro ao processar pedidos:", err);
          return res.status(500).json({ message: "Erro ao processar os pedidos", error: err });
        });
    });
  };
  


  export const deletePedido = (req, res) => {
    const pedidoId = req.params.id_pedido;
  
    // Verifica se o pedido pode ser deletado
    const checkQuery = `
      SELECT * 
      FROM pedido 
      WHERE id_pedido = ? 
        AND tipo <> 4 
        AND status <> 1
    `;
  
    db.query(checkQuery, [pedidoId], (err, pedidoData) => {
      if (err) return res.status(500).json({ message: "Erro ao verificar o pedido", err });
  
      // Verifica se o pedido foi encontrado e pode ser deletado
      if (pedidoData.length === 0) {
        return res.status(404).json({ message: "Pedido não encontrado ou não pode ser deletado." });
      }
  
      // Realiza a exclusão dos itens do pedido
      const deleteItensQuery = `
        DELETE FROM item_pedido 
        WHERE fk_id_pedido = ?
      `;
  
      db.query(deleteItensQuery, [pedidoId], (err) => {
        if (err) return res.status(500).json({ message: "Erro ao deletar itens do pedido", err });
  
        // Agora que os itens foram deletados, deletamos o pedido
        const deleteQuery = `
          DELETE FROM pedido 
          WHERE id_pedido = ?
        `;
  
        db.query(deleteQuery, [pedidoId], (err, result) => {
          if (err) return res.status(500).json({ message: "Erro ao deletar o pedido", err });
          
          // Verifica se a exclusão foi bem-sucedida
          if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Pedido não encontrado." });
          }
          
          return res.status(200).json({ message: "Pedido e itens deletados com sucesso." });
        });
      });
    });
  };
  