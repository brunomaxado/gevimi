import db from "../config/db.js";

export const getPedidosRelatorio = (req, res) => {
  const { inicioPeriodo, fimPeriodo, clientes, tipoPedido, status, produtos } = req.body.filters;

  let queryPedidos = `
    SELECT * 
    FROM pedido
  `;

  const conditions = [];
  const params = [];

  if (inicioPeriodo) {
    conditions.push("data_realizado >= ?");
    params.push(inicioPeriodo);
  }
  if (fimPeriodo) {
    conditions.push("data_realizado <= ?");
    params.push(fimPeriodo);
  }
  if (clientes && clientes.length > 0) {
    conditions.push(`fk_id_cliente IN (${clientes.map(() => "?").join(", ")})`);
    params.push(...clientes);
  }
  if (tipoPedido && tipoPedido.length > 0) {
    conditions.push(`tipo IN (${tipoPedido.map(() => "?").join(", ")})`);
    params.push(...tipoPedido);
  }
  if (status) {
    conditions.push(`status = ?`);
    params.push(status);
  }
  if (produtos && produtos.length > 0) {
    conditions.push(`id_pedido IN (
      SELECT fk_id_pedido 
      FROM item_pedido 
      WHERE fk_id_produto IN (${produtos.map(() => "?").join(", ")})
    )`);
    params.push(...produtos);
  }

  if (conditions.length > 0) {
    queryPedidos += ` WHERE ${conditions.join(" AND ")}`;
  }

  db.query(queryPedidos, params, (err, pedidosData) => {
    if (err) {
      console.error("Erro no banco de dados:", err);
      return res.status(500).json({ message: "Erro ao buscar os pedidos", err });
    }

    if (pedidosData.length === 0) {
      return res.status(404).json({ message: "Nenhum pedido encontrado" });
    }

    const promises = pedidosData.map((pedido) => {
      const queryItensPedido = `
        SELECT ip.*, p.preco_unitario
        FROM item_pedido ip
        JOIN produto p ON ip.fk_id_produto = p.id_produto
        WHERE ip.fk_id_pedido = ?
      `;

      return new Promise((resolve, reject) => {
        db.query(queryItensPedido, [pedido.id_pedido], (err, itensPedidoData) => {
          if (err) {
            console.error("Erro ao buscar itens do pedido:", err);
            return reject(err);
          }

          // Calcular o total do pedido
          const total = itensPedidoData.reduce((acc, item) => {
            return acc + (item.preco_unitario * (item.quantidade || 1));
          }, 0);

          // Consultar as informações do cliente, produto e tipo
          const queryCliente = `SELECT nome FROM cliente WHERE id_cliente = ?`;
          db.query(queryCliente, [pedido.fk_id_cliente], (err, clienteData) => {
            if (err) {
              console.error("Erro ao buscar cliente:", err);
              return reject(err);
            }

            // Consultar o produto
            const queryProduto = `SELECT nome FROM produto WHERE id_produto IN (
              SELECT fk_id_produto FROM item_pedido WHERE fk_id_pedido = ?
            )`;
            db.query(queryProduto, [pedido.id_pedido], (err, produtoData) => {
              if (err) {
                console.error("Erro ao buscar produto:", err);
                return reject(err);
              }

              // Mapeando o tipo do pedido
              const tipoMap = {
                1: "Entrega",
                2: "Entrega Ifood",
                3: "Retirada",
                4: "Comum"
              };
              const tipo = tipoMap[pedido.tipo] || "Desconhecido";

              // Mapeando o status
              const statusMap = {
                1: "Finalizado",
                2: "Pendente",
                3: "Andamento",
              };
              const status = statusMap[pedido.status] || "Desconhecido";

              resolve({
                ...pedido,
                cliente: clienteData[0]?.nome || "Cliente não encontrado",
                produto: produtoData.map(prod => prod.nome).join(", ") || "Produto não encontrado",
                tipo,
                status,
                itensPedido: itensPedidoData,
                total: total.toFixed(2), // Formato de duas casas decimais
              });
            });
          });
        });
      });
    });

    Promise.all(promises)
      .then((pedidosComItens) => {
        return res.status(200).json(pedidosComItens);
      })
      .catch((err) => {
        console.error("Erro na promessa:", err);
        return res.status(500).json(err);
      });
  });
};
