import db from "../config/db.js";

export const getProdutosRelatorio = (req, res) => {
  const { inicioPeriodo, fimPeriodo } = req.body.filters;

  if (!inicioPeriodo || !fimPeriodo) {
    return res.status(400).json({ message: "Os períodos de início e fim são obrigatórios." });
  }

  // Converte o formato de data e horário para 'YYYY-MM-DD HH:mm:ss'
  const inicio = inicioPeriodo.replace("T", " ").split(".")[0];
  const fim = fimPeriodo.replace("T", " ").split(".")[0];

  // Consulta SQL com os filtros de data e horário ajustados
  const queryProdutos = `
    WITH vp AS (
      SELECT 
        pe.data_realizado,
        p.id_produto, 
        p.nome, 
        ip.quantidade, 
        ip.preco_unitario_atual, 
        COALESCE(ip.quantidade, 0) * COALESCE(ip.preco_unitario_atual, 0) AS total
      FROM item_pedido ip
      INNER JOIN produto p ON p.id_produto = ip.fk_id_produto
      INNER JOIN pedido pe ON pe.id_pedido = ip.fk_id_pedido
      WHERE pe.data_realizado BETWEEN ? AND ?
    ),
    total AS (
      SELECT 
        vp.id_produto, 
        SUM(vp.total) AS soma
      FROM vp
      WHERE vp.data_realizado BETWEEN ? AND ?
      GROUP BY vp.id_produto
    )
    SELECT 
      p.nome AS produto, 
      COUNT(*) AS numero_vendas, 
      SUM(ip.quantidade) AS quantidade_vendida, 
      COALESCE(total.soma, 0) AS valor_total,
      MAX(ped.data_realizado) AS ultima_venda
    FROM item_pedido ip
    INNER JOIN produto p ON p.id_produto = ip.fk_id_produto
    LEFT JOIN total ON total.id_produto = ip.fk_id_produto
    INNER JOIN pedido ped ON ped.id_pedido = ip.fk_id_pedido
    WHERE ped.data_realizado BETWEEN ? AND ?
    GROUP BY p.nome, total.soma
    ORDER BY quantidade_vendida DESC, p.nome ASC
  `;

  const params = [inicio, fim, inicio, fim, inicio, fim];

  // Executa a consulta no banco de dados
  db.query(queryProdutos, params, (err, produtosData) => {
    if (err) {
      console.error("Erro ao buscar produtos:", err);
      return res.status(500).json({ message: "Erro ao buscar produtos", err });
    }

    if (produtosData.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado para o período especificado." });
    }

    // Retorna os dados encontrados
    return res.status(200).json(produtosData);
  });
};
