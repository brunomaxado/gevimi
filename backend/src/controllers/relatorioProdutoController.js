import db from "../config/db.js";

export const getProdutosRelatorio = (req, res) => {
  const { inicioPeriodo, fimPeriodo } = req.body.filters;

  let queryProdutos = `
    SELECT 
      p.nome AS produto, 
      p.unidade,
      SUM(ip.quantidade) AS quantidade_vendida,
      SUM(CASE WHEN ip.status = 'Cancelado' THEN ip.quantidade ELSE 0 END) AS quantidade_cancelada,
      COUNT(DISTINCT ip.fk_id_pedido) AS numero_vendas,
      SUM(ip.quantidade * ip.preco_unitario) AS valor_total,
      MAX(ped.data_realizado) AS ultima_venda
    FROM produto p
    LEFT JOIN item_pedido ip ON p.id_produto = ip.fk_id_produto
    LEFT JOIN pedido ped ON ip.fk_id_pedido = ped.id_pedido
    WHERE ped.data_realizado BETWEEN ? AND ?
    GROUP BY p.id_produto
    ORDER BY quantidade_vendida DESC
  `;

  const params = [inicioPeriodo, fimPeriodo];

  db.query(queryProdutos, params, (err, produtosData) => {
    if (err) {
      console.error("Erro ao buscar produtos:", err);
      return res.status(500).json({ message: "Erro ao buscar produtos", err });
    }

    if (produtosData.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado" });
    }

    return res.status(200).json(produtosData);
  });
};
