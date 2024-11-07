import db from "../config/db.js";

export const getDashboardData = (req, res) => {
  // Query para obter o número de pedidos por cliente
  const clientePorPedido = `
    SELECT c.nome, c.id_cliente, COUNT(id_pedido) AS num_pedido 
    FROM pedido
    INNER JOIN cliente c ON c.id_cliente = pedido.fk_id_cliente
    GROUP BY c.nome
    ORDER BY num_pedido DESC
  `;

  // Query para obter os totais dos pedidos
  const queryTotals = `
    SELECT
      COUNT(*) AS total_pedidos,
      COUNT(CASE WHEN tipo = 1 THEN 1 END) AS total_retirada,
      COUNT(CASE WHEN tipo <> 1 THEN 1 END) AS total_entrega,
      COUNT(CASE WHEN data_finalizado IS NULL THEN 1 END) AS total_finalizado,
      COUNT(CASE WHEN data_finalizado IS NOT NULL THEN 1 END) AS total_aberto
    FROM pedido
  `;

  // Query para calcular o total de faturamento
  const queryTotalPrice = `
    SELECT 
      SUM(i.preco_unitario_atual * i.quantidade) AS total
    FROM 
      item_pedido i
    INNER JOIN 
      pedido p ON p.id_pedido = i.fk_id_pedido
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
          totals: totalsData[0], // Dados totais de pedidos
          totalPrice: priceData[0].total, // Total de faturamento
          clientePorPedido: clientData // Número de pedidos por cliente
        });
      });
    });
  });
};
