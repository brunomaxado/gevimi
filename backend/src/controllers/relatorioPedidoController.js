import db from "../config/db.js";

export const getPedidosRelatorio = (req, res) => {
  const {
    inicioPeriodo,
    fimPeriodo,
    dataFinalizadoInicio,
    dataFinalizadoFim,
    dataEntregueInicio,
    dataEntregueFim,
    usuario,
    cliente,
    produto,
    tipoPedido,
    status,
  } = req.body.filters;

  let queryPedidos = `
    SELECT * 
    FROM pedido
  `;

  const conditions = [];
  const params = [];

  // Adiciona condições de filtro de datas
  if (inicioPeriodo) {
    conditions.push("data_realizado >= ?");
    params.push(inicioPeriodo);
  }
  if (fimPeriodo) {
    conditions.push("data_realizado <= ?");
    params.push(fimPeriodo);
  }
  if (dataFinalizadoInicio) {
    conditions.push("data_finalizado >= ?");
    params.push(dataFinalizadoInicio);
  }
  if (dataFinalizadoFim) {
    conditions.push("data_finalizado <= ?");
    params.push(dataFinalizadoFim);
  }
  if (dataEntregueInicio) {
    conditions.push("data_para_entregar >= ?");
    params.push(dataEntregueInicio);
  }
  if (dataEntregueFim) {
    conditions.push("data_para_entregar <= ?");
    params.push(dataEntregueFim);
  }
  if (usuario && usuario.length > 0) {
    conditions.push(`fk_id_usuario IN (${usuario.map(() => "?").join(", ")})`);
    params.push(...usuario);
  }
  if (cliente && cliente.length > 0) {
    conditions.push(`fk_id_cliente IN (${cliente.map(() => "?").join(", ")})`);
    params.push(...cliente);
  }
  if (tipoPedido && tipoPedido.length > 0) {
    conditions.push(`tipo IN (${tipoPedido.map(() => "?").join(", ")})`);
    params.push(...tipoPedido);
  }
  if (status && status.length > 0) {
    conditions.push(`status IN (${status.map(() => "?").join(", ")})`);
    params.push(...status);
  }
  if (produto && produto.length > 0) {
    conditions.push(`id_pedido IN (
      SELECT fk_id_pedido 
      FROM item_pedido 
      WHERE fk_id_produto IN (${produto.map(() => "?").join(", ")})
    )`);
    params.push(...produto);
  }

  // Adiciona as condições à consulta, se houver filtros
  if (conditions.length > 0) {
    queryPedidos += ` WHERE ${conditions.join(" AND ")}`;
  }

  db.query(queryPedidos, params, (err, pedidosData) => {
    if (err) {
      console.error("Erro ao buscar os pedidos:", err);
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
          const total = itensPedidoData.reduce((acc, item) => acc + (item.preco_unitario * (item.quantidade || 1)), 0);

          // Consultar o cliente
          const queryCliente = `SELECT nome FROM cliente WHERE id_cliente = ?`;
          db.query(queryCliente, [pedido.fk_id_cliente], (err, clienteData) => {
            if (err) {
              console.error("Erro ao buscar cliente:", err);
              return reject(err);
            }

            const queryProduto = `SELECT nome FROM produto WHERE id_produto IN (
              SELECT fk_id_produto FROM item_pedido WHERE fk_id_pedido = ?
            )`;
            db.query(queryProduto, [pedido.id_pedido], (err, produtoData) => {
              if (err) {
                console.error("Erro ao buscar produtos:", err);
                return reject(err);
              }

              // Verifica se algum produto foi encontrado
              if (produtoData.length === 0) {
                console.warn("Nenhum produto encontrado para o pedido:", pedido.id_pedido);
              }

              // Consultar o tipo de pedido e status
              const tipoMap = {
                1: "Entrega",
                2: "Entrega Ifood",
                3: "Retirada",
                4: "Comum"
              };
              const tipo = tipoMap[pedido.tipo] || "Desconhecido";

              const statusMap = {
                1: "Finalizado",
                2: "Pendente",
                3: "Andamento",
              };
              const status = statusMap[pedido.status] || "Desconhecido";

              resolve({
                ...pedido,
                cliente: clienteData[0]?.nome || "Cliente não encontrado",
                produtos: produtoData.map(prod => prod.nome).join(", ") || "Produto não encontrado",
                itensPedido: itensPedidoData,
                tipo,
                status,
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
