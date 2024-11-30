import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import LOGO_BASE64 from "./logo";
import { AuthContext } from "../context/authContext";

const RelatorioProduto = () => {
  const { currentUser } = useContext(AuthContext);
  const [filters, setFilters] = useState({
    inicioPeriodo: "",
    fimPeriodo: "",
  });
  const [produtos, setProdutos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerateReport = async () => {
    if (!filters.inicioPeriodo || !filters.fimPeriodo) {
      setErrorMessage("Por favor, preencha ambas as datas.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8800/relatorio-produto", { filters });
      setProdutos(response.data);
      setErrorMessage("");
      generatePDF(response.data);
    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
      setErrorMessage("Erro ao buscar dados do relatório.");
    }
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();
    doc.addImage(LOGO_BASE64, "PNG", 14, 10, 30, 30);
    doc.setFontSize(18);
    doc.text("Relatório de Produtos", 50, 20);
    doc.setFontSize(11);
    doc.text(`Emitido por: ${currentUser.nome}`, 50, 30);

    const tableData = data.map((produto) => [
      produto.produto,
      produto.unidade,
      produto.quantidade_vendida || 0,
      produto.quantidade_cancelada || 0,
      produto.numero_vendas || 0,
      produto.valor_total ? `R$ ${produto.valor_total.toFixed(2)}` : "R$ 0,00",
      produto.ultima_venda || "Sem venda",
    ]);

    doc.autoTable({
      head: [["Produto", "Unidade", "Qtd. Vendida", "Qtd. Cancelada", "Nº Vendas", "Valor Total (R$)", "Última Venda"]],
      body: tableData,
      startY: 50,
    });

    doc.save("relatorio_produtos.pdf");
  };

  return (
    <div>
      <h1>Relatório de Produtos</h1>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <div>
        <TextField
          label="Data Início"
          type="date"
          value={filters.inicioPeriodo}
          onChange={(e) => setFilters({ ...filters, inicioPeriodo: e.target.value })}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Data Fim"
          type="date"
          value={filters.fimPeriodo}
          onChange={(e) => setFilters({ ...filters, fimPeriodo: e.target.value })}
          InputLabelProps={{ shrink: true }}
        />
        <button onClick={handleGenerateReport}>Gerar Relatório</button>
      </div>
    </div>
  );
};

export default RelatorioProduto;
