import db from "../config/db.js";

export const getDashboardData = (req, res) => {
  const { inicioPeriodo, fimPeriodo } = req.query;

  // Filtro de período, se as datas estiverem presentes
  let dateFilter = "";
  if (inicioPeriodo && fimPeriodo) {
    dateFilter = `WHERE pedido.data_realizado BETWEEN '${inicioPeriodo}' AND '${fimPeriodo}'`;
  } else if (inicioPeriodo) {
    dateFilter = `WHERE pedido.data_realizado >= '${inicioPeriodo}'`;
  } else if (fimPeriodo) {
    dateFilter = `WHERE pedido.data_realizado <= '${fimPeriodo}'`;
  }

  const clientePorPedido = `
    SELECT c.nome, c.id_cliente, COUNT(id_pedido) AS num_pedido 
    FROM pedido
    INNER JOIN cliente c ON c.id_cliente = pedido.fk_id_cliente
    ${dateFilter}
    GROUP BY c.nome
    ORDER BY num_pedido DESC
  `;

  const queryTotals = `
    SELECT
      COUNT(*) AS total_pedidos,
      COUNT(CASE WHEN tipo = 4 THEN 1 END) AS total_retirada,
      COUNT(CASE WHEN tipo <> 4 THEN 1 END) AS total_entrega,
      COUNT(CASE WHEN data_finalizado IS NULL THEN 1 END) AS total_aberto,
      COUNT(CASE WHEN data_finalizado IS NOT NULL THEN 1 END) AS total_finalizado
    FROM pedido
    ${dateFilter}
  `;

  const queryTotalPrice = `
    SELECT 
      SUM(i.preco_unitario_atual * i.quantidade) AS total
    FROM 
      item_pedido i
    INNER JOIN 
      pedido p ON p.id_pedido = i.fk_id_pedido
    ${dateFilter ? `AND p.data_realizado BETWEEN '${inicioPeriodo}' AND '${fimPeriodo}'` : ""}
  `;

  // Executa as consultas de totais e faturamento
  db.query(queryTotals, (err, totalsData) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar dados de totais", err });
    }

    // Executa a consulta de faturamento
    db.query(queryTotalPrice, (err, priceData) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao buscar dados de preços", err });
      }

      // Executa a consulta para o número de pedidos por cliente
      db.query(clientePorPedido, (err, clientData) => {
        if (err) {
          return res.status(500).json({ message: "Erro ao buscar dados de clientes", err });
        }

        // Envia a resposta com todos os dados
        return res.status(200).json({
          totals: totalsData[0],
          totalPrice: priceData[0].total,
          clientePorPedido: clientData
        });
      });
    });
  });
};
