import db from "../config/db.js";

// Controlador para obter os dados do dashboard
export const getDashboardData = (req, res) => {
  // Query para obter os totais dos pedidos
  const queryTotals = `
    SELECT
      COUNT(*) AS total_pedidos,
      COUNT(CASE WHEN tipo = 1 THEN 1 END) AS total_retirada,
      COUNT(CASE WHEN tipo <> 1 THEN 1 END) AS total_entrega,
      COUNT(CASE WHEN data_finalizado IS NULL THEN 1 END) AS total_finalizado,
      COUNT(CASE WHEN data_finalizado IS NOT NULL THEN 1 END) AS total_aberto
    FROM pedido
    WHERE data_deletado IS NULL
  `;

  // Query para obter o total dos preços dos itens pedidos
  const queryTotalPrice = `
    SELECT 
      SUM(i.preco_unitario_atual * i.quantidade) AS total
    FROM 
      item_pedido i
    INNER JOIN 
      pedido p ON p.id_pedido = i.fk_id_pedido
    WHERE 
      p.data_deletado IS NULL
  `;

  // Executa a primeira consulta
  db.query(queryTotals, (err, totalsData) => {
    if (err) return res.status(500).json({ message: "Erro ao buscar dados de totais", err });

    // Executa a segunda consulta
    db.query(queryTotalPrice, (err, priceData) => {
      if (err) return res.status(500).json({ message: "Erro ao buscar dados de preços", err });

      // Retorna os resultados das consultas
      return res.status(200).json({
        totals: totalsData[0],
        totalPrice: priceData[0].total
      });
    });
  });
};
