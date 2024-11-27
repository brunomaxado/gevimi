import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select, MenuItem, FormControl, TextField } from "@mui/material";
import '../style.css';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const RelatorioPedido = () => {
  const navigate = useNavigate();

  // Funções para obter as datas padrão
  const getFirstDayOfMonth = () => {
    const date = new Date();
    date.setDate(1); // Define o primeiro dia do mês
    date.setHours(0, 0, 0, 0); // Define a hora para o início do dia (00:00:00)
    return date.toISOString().slice(0, 16); // Retorna a data no formato 'YYYY-MM-DDTHH:mm'
  };

  const getLastDayOfMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1); // Vai para o próximo mês
    date.setDate(0); // Define o último dia do mês anterior
    date.setHours(23, 59, 59, 999); // Define a hora para o final do dia (23:59:59.999)
    return date.toISOString().slice(0, 16); // Retorna a data no formato 'YYYY-MM-DDTHH:mm'
  };

  // Estado para armazenar os filtros
  const [filters, setFilters] = useState({
    inicioPeriodo: getFirstDayOfMonth(), // Data de início do mês
    fimPeriodo: getLastDayOfMonth(), // Data de fim do mês
    tipoPedido: [],
    status: "",
  });

  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const generatePDF = async () => {
    try {
      console.log(filters);
  
      const response = await axios.post("http://localhost:8800/relatorio-pedido", { filters });
      const pedidos = response.data;
  
      const doc = new jsPDF();
  
      // Adicionando o título
      doc.setFontSize(18);
      doc.text("Relatório de Pedidos", 14, 15);
  
      // Data de Emissão
      const date = new Date().toLocaleString();
      doc.setFontSize(11);
      doc.text(`Data de Emissão: ${date}`, 14, 23);
  
      // Exibindo os filtros utilizados
      doc.text(`Período: ${filters.inicioPeriodo} até ${filters.fimPeriodo}`, 14, 30);
      doc.text(`Status: ${filters.status || 'Todos'}`, 14, 36);
      doc.text(`Tipo de Pedido: ${filters.tipoPedido.join(', ') || 'Todos'}`, 14, 42);
  
      // Linha separando o cabeçalho da tabela
      doc.line(14, 48, 200, 48);
  
      let startY = 55; // Posição inicial para os pedidos
      const maxItemsPerPage = 5; // Limite de itens por página
      let itemsOnCurrentPage = 0; // Contador de itens na página atual
  
      pedidos.forEach((pedido, index) => {
        // Formatação da data para exibir apenas a data (sem horas)
        const dataEntrega = pedido.data_para_entregar
          ? new Date(pedido.data_para_entregar).toLocaleDateString("pt-BR")
          : "Sem data";
        const dataFinalizado = pedido.data_finalizado
          ? new Date(pedido.data_finalizado).toLocaleDateString("pt-BR")
          : "Não finalizado";
  
        // Formatação do total para exibir com vírgula e símbolo R$
        const totalFormatado = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(pedido.total || 0);
  
        // Exibe cada campo do pedido com rótulos
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0); // Cor do texto preta
        doc.text(`Cliente: ${pedido.cliente}`, 16, startY);
        doc.text(`Tipo: ${pedido.tipo}`, 16, startY + 6);
        doc.text(`Produto: ${pedido.produto}`, 16, startY + 12);
        doc.text(`Data de Entrega: ${dataEntrega}`, 16, startY + 18);
        doc.text(`Status: ${pedido.status}`, 16, startY + 24);
        doc.text(`Finalizado em: ${dataFinalizado}`, 16, startY + 30);
        doc.text(`Total: ${totalFormatado}`, 16, startY + 36);
  
        // Linha de separação abaixo de cada pedido
        doc.setDrawColor(0, 0, 0); // Cor da linha
        doc.line(14, startY + 42, 200, startY + 42); // Linha horizontal abaixo do bloco do pedido
  
        // Atualiza a posição Y para o próximo pedido
        startY += 50; // Adiciona espaço entre os blocos de pedidos
        itemsOnCurrentPage++;
  
        // Se o número de itens exceder o limite por página, cria uma nova página
        if (itemsOnCurrentPage >= maxItemsPerPage) {
          doc.addPage(); // Adiciona uma nova página
          startY = 15; // Reseta a posição Y para o início da página
          itemsOnCurrentPage = 0; // Reseta o contador de itens na página
        }
      });
  
      // Finaliza o PDF
      doc.save("pedidos.pdf");
    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
    }
  };
  


  useEffect(() => {
    axios.get("http://localhost:8800/cliente")
      .then(response => setClientes(response.data))
      .catch(error => console.error("Erro ao buscar clientes:", error));

    axios.get("http://localhost:8800/usuario")
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Erro ao buscar usuários:", error));

    axios.get("http://localhost:8800/readProduto")
      .then(response => setProdutos(response.data))
      .catch(error => console.error("Erro ao buscar produto:", error));
  }, []);

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

  console.log(filters);

  return (
    <div>
      <h1>Relatório de Pedidos</h1>
      <div className="filter-container-pai">
        <div className="filters-container">
          {/* Filtros de Período e Data */}
          <div>
            <label>Data de início: <span className="asterisco">*</span></label>
            <TextField
              type="datetime-local"
              value={filters.inicioPeriodo}
              onChange={handleChange}
              name="inicioPeriodo"
              variant="standard"  // Aplica a variante "standard"
              style={{ marginBottom: '20px', width: '300px' }}
            />
          </div>

          <div>
            <label>Data de fim: <span className="asterisco">*</span></label>
            <TextField
              type="datetime-local"
              value={filters.fimPeriodo}
              onChange={handleChange}
              name="fimPeriodo"
              variant="standard"  // Aplica a variante "standard"
              style={{ marginBottom: '20px', width: '300px' }}
            />
          </div>

          {/* Select para Status */}
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
            <label>Situação do Pedido:</label>
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
            <div className="actions">
              <button onClick={generatePDF}>
                Gerar Relatório
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatorioPedido;
