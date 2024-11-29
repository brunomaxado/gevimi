import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, MenuItem, FormControl, TextField, Button } from "@mui/material";
import '../style.css';
import LOGO_BASE64 from "./logo";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const RelatorioPedido = () => {
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
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return formatDateTimeLocal(date);
  };

  const getLastDayOfMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    date.setHours(23, 59, 59, 999);
    return formatDateTimeLocal(date);
  };

  const [filters, setFilters] = useState({
    inicioPeriodo: getFirstDayOfMonth(),
    fimPeriodo: getLastDayOfMonth(),
    dataFinalizadoInicio: "",
    dataFinalizadoFim: "",
    dataEntregueInicio: "",
    dataEntregueFim: "",
    categoria: "",
    usuario: "",
    cliente: [],
    produto: [],
    tipoPedido: [],
    status: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [statusOptions, setStatusOptions] = useState([
    { id: 1, label: "Finalizado" },
    { id: 2, label: "Pendente" },
    { id: 3, label: "Andamento" }
  ]);
  const [tipoPedidoOptions, setTipoPedidoOptions] = useState([
    { id: 1, label: "Entrega" },
    { id: 2, label: "Entrega Ifood" },
    { id: 3, label: "Retirada" },
    { id: 4, label: "Comum" }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch clientes
        const clienteResponse = await axios.get("http://localhost:8800/cliente");
        const clientesOrdenados = clienteResponse.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setClientes(clientesOrdenados);

        // Fetch produtos
        const produtoResponse = await axios.get("http://localhost:8800/readProduto");
        const produtosOrdenados = produtoResponse.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setProdutos(produtosOrdenados);

        // Fetch usuários
        const usuarioResponse = await axios.get("http://localhost:8800/usuario");
        const usuariosOrdenados = usuarioResponse.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setUsuarios(usuariosOrdenados);
      } catch (error) {
        console.error("Erro ao carregar os filtros do banco de dados:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleResetFilters = () => {
    setFilters({
      inicioPeriodo: getFirstDayOfMonth(),
      fimPeriodo: getLastDayOfMonth(),
      dataFinalizadoInicio: "",
      dataFinalizadoFim: "",
      dataEntregueInicio: "",
      dataEntregueFim: "",
      categoria: "",
      usuario: "",
      cliente: [],
      produto: [],
      tipoPedido: [],
      status: "",
    });
    setErrorMessage("");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value || 0);
  };

  const formatDate = (date) => {
    if (!date) return "Sem data";
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  };

  const generatePDF = async () => {
    if (!validateDates()) return;
    try {
      setErrorMessage("");
      const response = await axios.post("http://localhost:8800/relatorio-pedido", { filters });
      const pedidos = response.data;

      if (!pedidos || pedidos.length === 0) {
        setErrorMessage("Não há dados para o intervalo de tempo selecionado.");
        return;
      }

      const doc = new jsPDF();
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

      const dataInicioFormatada = formatDate(filters.inicioPeriodo);
      const dataFimFormatada = formatDate(filters.fimPeriodo);
      doc.text(`Período: ${dataInicioFormatada} até ${dataFimFormatada}`, 14, 50);

      doc.text(`Status: ${filters.status ? statusOptions.find(s => s.id === filters.status)?.label : 'Todos'}`, 14, 55);
      doc.text(`Tipo de Pedido: ${filters.tipoPedido.map(id => tipoPedidoOptions.find(t => t.id === id)?.label).join(', ') || 'Todos'}`, 14, 60);
      doc.text(`Data Finalizado: ${formatDate(filters.dataFinalizadoInicio)} a ${formatDate(filters.dataFinalizadoFim)}`, 14, 65);
      doc.text(`Data Entregue: ${formatDate(filters.dataEntregueInicio)} a ${formatDate(filters.dataEntregueFim)}`, 14, 70);

      const tableData = pedidos.map((pedido) => [
        pedido.cliente || "N/A",
        pedido.tipo || "N/A",
        pedido.produto || "N/A",
        pedido.status || "N/A",
        formatDate(pedido.data_para_entregar),
        formatDate(pedido.data_finalizado),
        formatCurrency(pedido.total),
      ]);

      const header = [
        ["Cliente", "Tipo", "Produto", "Status", "Data de Entrega", "Finalizado em", "Total"],
      ];

      doc.autoTable({
        startY: 80,
        head: header,
        body: tableData,
        styles: { fontSize: 10, halign: "left", valign: "middle" },
        headStyles: { fillColor: [242, 203, 87], textColor: [0, 0, 0] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        theme: "striped",
        pageBreak: "auto",
        showHead: "everyPage",
      });

      doc.save("relatorio_pedidos.pdf");
    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
      setErrorMessage("Erro ao gerar o relatório. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div>
      <h1>Relatório de Pedidos</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="filter-container-pai" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        <div>
          <label>Data de Início: <span className="asterisco">*</span></label>
          <TextField type="datetime-local" name="inicioPeriodo" value={filters.inicioPeriodo} variant="standard"
            onChange={(e) => setFilters({ ...filters, inicioPeriodo: e.target.value })} />
        </div>
        <div>
          <label>Data de Fim: <span className="asterisco">*</span></label>
          <TextField type="datetime-local" name="fimPeriodo" value={filters.fimPeriodo} variant="standard"
            onChange={(e) => setFilters({ ...filters, fimPeriodo: e.target.value })} />
        </div>
        <div>
          <label>Data Finalizado inicial:</label>
          <TextField type="datetime-local" name="dataFinalizadoInicio" value={filters.dataFinalizadoInicio} variant="standard"
            onChange={(e) => setFilters({ ...filters, dataFinalizadoInicio: e.target.value })} />
        </div>
        <div>
          <label>Data Finalizado final:</label>
          <TextField type="datetime-local" name="dataFinalizadoFim" value={filters.dataFinalizadoFim} variant="standard"
            onChange={(e) => setFilters({ ...filters, dataFinalizadoFim: e.target.value })} />
        </div>
        <div>
          <label>Data Entregue inicial:</label>
          <TextField type="datetime-local" name="dataEntregueInicio" value={filters.dataEntregueInicio} variant="standard"
            onChange={(e) => setFilters({ ...filters, dataEntregueInicio: e.target.value })} />
        </div>
        <div>
          <label>Data Entregue final:</label>
          <TextField type="datetime-local" name="dataEntregueFim" value={filters.dataEntregueFim} variant="standard"
            onChange={(e) => setFilters({ ...filters, dataEntregueFim: e.target.value })} />
        </div>

        <FormControl>
          <label>Cliente</label>
          <Select name="cliente" value={filters.cliente} onChange={(e) => setFilters({ ...filters, cliente: e.target.value })} multiple>
            {clientes.map((cliente) => (
              <MenuItem key={cliente.id_cliente} value={cliente.id_cliente}>
                {cliente.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <label>Usuário</label>
          <Select name="usuario" value={filters.usuario} onChange={(e) => setFilters({ ...filters, usuario: e.target.value })}>
            {usuarios.map((usuario) => (
              <MenuItem key={usuario.id_usuario} value={usuario.id_usuario}>
                {usuario.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <label>Produto</label>
          <Select name="produto" value={filters.produto} onChange={(e) => setFilters({ ...filters, produto: e.target.value })} multiple>
            {produtos.map((produto) => (
              <MenuItem key={produto.id_produto} value={produto.id_produto}>
                {produto.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <label>Status:</label>
          <Select name="status" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            {statusOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <label>Tipo do Pedido:</label>
          <Select name="tipoPedido" value={filters.tipoPedido} onChange={(e) => setFilters({ ...filters, tipoPedido: e.target.value })} multiple>
            {tipoPedidoOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="actions" style={{ marginTop: "20px" }}>
        <Button variant="outlined" color="secondary" onClick={handleResetFilters}>
          Limpar Filtros
        </Button>
        <Button variant="contained" color="primary" onClick={generatePDF} disabled={!filters.inicioPeriodo || !filters.fimPeriodo}>
          Gerar Relatório
        </Button>
      </div>
    </div>
  );
};

export default RelatorioPedido;
