import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, MenuItem, FormControl, TextField } from "@mui/material";
import '../style.css';
import LOGO_BASE64 from "./logo";

import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const RelatorioPedido = () => {
  // Funções para obter as datas padrão
  const formatDateTimeLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  
  const getFirstDayOfMonth = () => {
    const date = new Date();
    date.setDate(1); // Primeiro dia do mês
    date.setHours(0, 0, 0, 0); // Início do dia
    return formatDateTimeLocal(date);
  };
  
  const getLastDayOfMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1); // Próximo mês
    date.setDate(0); // Último dia do mês anterior
    date.setHours(23, 59, 59, 999); // Final do dia
    return formatDateTimeLocal(date);
  };
  

  // Estados
  const [filters, setFilters] = useState({
    inicioPeriodo: getFirstDayOfMonth(),
    fimPeriodo: getLastDayOfMonth(),
    tipoPedido: [],
    status: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Mensagem de erro ou aviso

  const validateDates = () => {
    if (!filters.inicioPeriodo || !filters.fimPeriodo) {
      setErrorMessage("Por favor, preencha ambas as datas para gerar o relatório.");
      return false;
    }
    if (new Date(filters.inicioPeriodo) > new Date(filters.fimPeriodo)) {
      setErrorMessage("A data de início não pode ser maior que a data de fim.");
      return false;
    }
    return true;
  };

  const generatePDF = async () => {
    if (!validateDates()) return;
    try {
      setErrorMessage(""); // Resetando qualquer mensagem de erro anterior
  
      const inicioPeriodo = new Date(filters.inicioPeriodo);
      const fimPeriodo = new Date(filters.fimPeriodo);
  
      if (isNaN(inicioPeriodo.getTime()) || isNaN(fimPeriodo.getTime())) {
        setErrorMessage("Por favor, insira um intervalo de datas válido.");
        return;
      }
  
      const response = await axios.post("http://localhost:8800/relatorio-pedido", { filters });
      const pedidos = response.data;
  
      if (!pedidos || pedidos.length === 0) {
        setErrorMessage("Não há dados para o intervalo de tempo selecionado.");
        return;
      }
  
      const doc = new jsPDF();
  
      // Adicionando o logotipo e o título
      doc.addImage(LOGO_BASE64, 'PNG', 14, 10, 30, 30);
      doc.setFontSize(18);
      doc.text("Business VIMI", 50, 20);
      doc.setFontSize(11);
      doc.text("Relatório de Pedidos", 50, 28);
  
      const date = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date());
      doc.text(`Data de Emissão: ${date}`, 50, 35);
  
      const dataInicioFormatada = new Intl.DateTimeFormat("pt-BR").format(inicioPeriodo);
      const dataFimFormatada = new Intl.DateTimeFormat("pt-BR").format(fimPeriodo);
      doc.text(`Período: ${dataInicioFormatada} até ${dataFimFormatada}`, 14, 50);
      doc.text(`Status: ${filters.status || 'Todos'}`, 14, 55);
      doc.text(`Tipo de Pedido: ${filters.tipoPedido.join(', ') || 'Todos'}`, 14, 60);
  
      // Configuração dos dados da tabela
      const tableData = pedidos.map((pedido) => [
        pedido.cliente || "N/A",
        pedido.tipo || "N/A",
        pedido.produto || "N/A",
        pedido.status || "N/A",
        pedido.data_para_entregar && !isNaN(new Date(pedido.data_para_entregar).getTime())
          ? new Intl.DateTimeFormat("pt-BR").format(new Date(pedido.data_para_entregar))
          : "Sem data",
        pedido.data_finalizado && !isNaN(new Date(pedido.data_finalizado).getTime())
          ? new Intl.DateTimeFormat("pt-BR").format(new Date(pedido.data_finalizado))
          : "Não finalizado",
        new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(pedido.total || 0),
      ]);
  
      const header = [
        ["Cliente", "Tipo", "Produto", "Status", "Data de Entrega", "Finalizado em", "Total"],
      ];
  
      // Configurando a tabela para exibir o cabeçalho em todas as páginas
      doc.autoTable({
        startY: 70, // Posição inicial da tabela
        head: header,
        body: tableData,
        styles: { fontSize: 10, halign: "left", valign: "middle" }, // Alinhamento horizontal à esquerda
        headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255], halign: "left" },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        theme: "striped",
        pageBreak: "auto", // Controle automático para quebra de página
        showHead: "everyPage", // Cabeçalho em todas as páginas
      });
  
      // Salvando o PDF
      doc.save("relatorio_pedidos.pdf");
    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
  
      if (error.response) {
        setErrorMessage("Erro ao tentar obter dados do servidor. Verifique a conexão.");
      } else if (error.request) {
        setErrorMessage("Não foi possível se conectar ao servidor. Tente novamente.");
      } else {
        setErrorMessage("Ocorreu um erro ao gerar o relatório. Tente novamente.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleStatusChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: event.target.value,
    }));
  };

  const handleTipoPedidoChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      tipoPedido: event.target.value,
    }));
  };

  return (
    <div>
      <h1>Relatório de Pedidos</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="filter-container-pai">
        <div className="filters-container">
          <div>
            <label>Data de início: <span className="asterisco">*</span></label>
            <TextField
              type="datetime-local"
              value={filters.inicioPeriodo}
              onChange={handleChange}
              name="inicioPeriodo"
              variant="standard"
              style={{ marginBottom: '20px', width: '300px' }}
              required
            />
          </div>

          <div>
            <label>Data de fim: <span className="asterisco">*</span></label>
            <TextField
              type="datetime-local"
              value={filters.fimPeriodo}
              onChange={handleChange}
              name="fimPeriodo"
              variant="standard"
              style={{ marginBottom: '20px', width: '300px' }}
              required
            />
          </div>

          <FormControl variant="standard" style={{ marginTop: '17px', marginBottom: '20px', width: '300px' }}>
            <label>Status:</label>
            <Select
              value={filters.status}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value={1}>Finalizado</MenuItem>
              <MenuItem value={2}>Pendente</MenuItem>
              <MenuItem value={3}>Andamento</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" style={{ marginTop: '17px', marginBottom: '20px', width: '300px' }}>
            <label>Tipo do Pedido:</label>
            <Select
              value={filters.tipoPedido}
              onChange={handleTipoPedidoChange}
              label="Situação do Pedido"
              multiple
            >
              <MenuItem value={1}>Entrega</MenuItem>
              <MenuItem value={2}>Entrega Ifood</MenuItem>
              <MenuItem value={3}>Retirada</MenuItem>
              <MenuItem value={4}>Comum</MenuItem>
            </Select>
          </FormControl>

          <div className="actions">
            <button onClick={() => {
              setFilters({
                inicioPeriodo: getFirstDayOfMonth(),
                fimPeriodo: getLastDayOfMonth(),
                tipoPedido: [],
                status: "",
              });
            }}>Limpar Filtros</button>
            <button onClick={generatePDF}  disabled={!filters.inicioPeriodo || !filters.fimPeriodo} style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: (!filters.inicioPeriodo || !filters.fimPeriodo) ? "grey" : "#FFA500",
              color: "black",
              border: "none",
              cursor: (!filters.inicioPeriodo || !filters.fimPeriodo) ? "not-allowed" : "pointer",
            }}>Gerar Relatório</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatorioPedido;
