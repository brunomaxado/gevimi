import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select, MenuItem, FormControl, TextField } from "@mui/material";
import '../style.css';
import LOGO_BASE64 from "./logo";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AuthContext } from "../context/authContext"; // Importando contexto de autenticação
import { Link } from "react-router-dom";
import { useModified } from "../context/ModifiedContext";

export const RelatorioPedido = () => {
  const { currentUser } = useContext(AuthContext); // Capturando o usuário logado
  const formatDateTimeLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  const navigate = useNavigate();
  const { isModified, setIsModified } = useModified(); // Acessando o contexto
  const handleClick = (e) => {


    e.preventDefault();
    if(isModified)
    {
        setShowSairModal(true);
        return;
    }
    navigate(-1); // Navega para a página anterior
  };
  const getFirstDayOfMonth = () => {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return new Date(date - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  };
  const getLastDayOfMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    date.setHours(23, 59, 59, 999);
    return new Date(date - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  };
  useEffect(() => {
    // Reseta isModified ao desmontar o componente
    return () => {
      setIsModified(false);
    };
  }, [setIsModified]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    inicioPeriodo:  getFirstDayOfMonth(),
    fimPeriodo: getLastDayOfMonth(),
    dataFinalizadoInicio: "",
    dataFinalizadoFim: "",
    dataEntregueInicio: "",
    dataEntregueFim: "",
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
  const [showSairModal, setShowSairModal] =   useState(false);
  const handleConfirmExit = () => {
    navigate(-1);
    setShowSairModal(false); // Fecha o modal
  };
  
  const handleCancelExit = () => {
    setShowSairModal(false); // Fecha o modal sem realizar a ação
  };
  const statusOptions = [
    { id: 1, label: "Finalizado" },
    { id: 3, label: "Pendente" },
    { id: 2, label: "Produção" },
  ];
  const handleChange = (e) => {
    setIsModified(true); // Marca o formulário como modificado
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value, // Atualiza o valor do campo com base no nome
    }));
  };
  const tipoPedidoOptions = [
    { id: 1, label: "Entrega" },
    { id: 2, label: "Entrega Ifood" },
    { id: 3, label: "Retirada" },
    { id: 4, label: "Comum" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clienteResponse = await axios.get("http://localhost:8800/cliente");
        const clientesOrdenados = clienteResponse.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setClientes(clientesOrdenados);

        const produtoResponse = await axios.get("http://localhost:8800/readProduto");
        const produtosOrdenados = produtoResponse.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setProdutos(produtosOrdenados);

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
      usuario: "",
      cliente: [],
      produto: [],
      tipoPedido: [],
      status: "",
    });
    setErrorMessage("");
  };
  const generateReportHandler = async (e) => {
    e.preventDefault();

    const hasPeriodoPrincipal = filters.inicioPeriodo && filters.fimPeriodo;
    const hasPeriodoFinalizado = filters.dataFinalizadoInicio && filters.dataFinalizadoFim;
    const hasPeriodoEntregue = filters.dataEntregueInicio && filters.dataEntregueFim;

    // Verifica se pelo menos um conjunto de datas está completo
    if (!hasPeriodoPrincipal && !hasPeriodoFinalizado && !hasPeriodoEntregue) {
      setError("Pelo menos um período deve ser preenchido (Período de Realização, Finalização ou Entrega).");
      return;
    }

    // Validação para pares de datas dentro de cada grupo
    if (
      (filters.dataFinalizadoInicio && !filters.dataFinalizadoFim) ||
      (!filters.dataFinalizadoInicio && filters.dataFinalizadoFim)
    ) {
      setError("Se uma Data Finalizada Inicial for preenchida, a Final deve ser preenchida também e vice-versa.");
      return;
    }

    if (
      (filters.dataEntregueInicio && !filters.dataEntregueFim) ||
      (!filters.dataEntregueInicio && filters.dataEntregueFim)
    ) {
      setError("Se uma Data Entregue Inicial for preenchida, a Final deve ser preenchida também e vice-versa.");
      return;
    }

    // Se todas as validações passarem
    setError(null);

    // Continua para a geração do relatório
    try {
      await generatePDF(); // Função para geração do PDF
    } catch (error) {
      setError("Ocorreu um erro ao gerar o relatório. Por favor, tente novamente.");
      console.error("Erro ao gerar o relatório:", error);
    }
  };


  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value || 0);
  };

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return "Sem data";
    }
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  };

  const generatePDF = async () => {
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
      doc.text("Relatório de Pedidos ordenado por data de realização", 50, 28);

      const date = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date());
      doc.text(`Data de Emissão: ${date}`, 50, 35);

      if (currentUser) {
        doc.text(`Gerado por: ${currentUser.nome || 'Usuário desconhecido'}`, 50, 40);
      }

      const dataInicioFormatada = formatDate(filters.inicioPeriodo);
      const dataFimFormatada = formatDate(filters.fimPeriodo);
      const dataFinalizadoInicioFormatada = formatDate(filters.dataFinalizadoInicio);
      const dataFinalizadoFimFormatada = formatDate(filters.dataFinalizadoFim);
      const dataEntregueInicioFormatada = formatDate(filters.dataEntregueInicio);
      const dataEntregueFimFormatada = formatDate(filters.dataEntregueFim);

      // Adicionando os filtros aplicados no PDF
      doc.setFontSize(10);
      doc.text(
        `Data Realizado: ${dataInicioFormatada && dataFimFormatada ? `${dataInicioFormatada} até ${dataFimFormatada}` : 'Sem data'}`,
        14, 50
      );
      doc.text(
        `Data Finalizado: ${(dataFinalizadoInicioFormatada && dataFinalizadoFimFormatada)
          ? `${dataFinalizadoInicioFormatada} até ${dataFinalizadoFimFormatada}`
          : (dataFinalizadoInicioFormatada || dataFinalizadoFimFormatada ? 'Sem data' : 'Todos')
        }`,
        14, 55
      );
      doc.text(
        `Data Entregue: ${(dataEntregueInicioFormatada && dataEntregueFimFormatada)
          ? `${dataEntregueInicioFormatada} até ${dataEntregueFimFormatada}`
          : (dataEntregueInicioFormatada || dataEntregueFimFormatada ? 'Sem data' : 'Todos')
        }`,
        14, 60
      );
      doc.text(`Cliente: ${filters.cliente.length > 0 ? filters.cliente.map(id => clientes.find(c => c.id_cliente === id)?.nome).join(', ') : 'Todos'}`, 14, 65);
      doc.text(`Produto: ${filters.produto.length > 0 ? filters.produto.map(id => produtos.find(p => p.id_produto === id)?.nome).join(', ') : 'Todos'}`, 14, 70);
      doc.text(`Usuário: ${filters.usuario ? usuarios.find(u => u.id_usuario === filters.usuario)?.nome : 'Todos'}`, 14, 75);
      doc.text(`Status: ${filters.status ? statusOptions.find(s => s.id === filters.status)?.label : 'Todos'}`, 14, 80);
      doc.text(`Tipo de Pedido: ${filters.tipoPedido.length > 0 ? filters.tipoPedido.map(id => tipoPedidoOptions.find(t => t.id === id)?.label).join(', ') : 'Todos'}`, 14, 85);

      const tableData = pedidos.map((pedido) => [
        pedido.cliente || "N/A",
        pedido.tipo || "N/A",
        pedido.produtos || "N/A",
        pedido.status || "N/A",
        formatDate(pedido.data_para_entregar),
        formatDate(pedido.data_finalizado),
        formatDate(pedido.data_realizado),
        formatCurrency(pedido.total),
      ]);

      const header = [
        ["Cliente", "Tipo", "Produto", "Status", "Data de Entrega", "Finalizado em", "Realizado em:", "Total"],
      ];

      doc.autoTable({
        startY: 90,
        head: header,
        body: tableData,
        styles: { fontSize: 10, halign: "left", valign: "middle" },
        headStyles: { fillColor: [242, 203, 87], textColor: [0, 0, 0] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        theme: "striped",
        pageBreak: "auto",
        showHead: "everyPage",
        columnStyles: {
          7: { halign: "right" },
        },
      });

      doc.save("relatorio_pedidos.pdf");

    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
      setErrorMessage("Erro ao gerar o relatório. Verifique os dados e tente novamente.");
      setError("Nenhum registro foi encontrado com os filtros aplicados. Por favor, revise os critérios e tente novamente.");
    }
  };

  return (
    <div>
      <h1>Relatório de Pedidos</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="filter-container-pai" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "30px" }}>
        <label>Data de Realização inicial:  
          <TextField type="datetime-local" name="inicioPeriodo" value={filters.inicioPeriodo} variant="standard"
            onChange={handleChange} /></label>

        <label>Data de Realização final:  
          <TextField type="datetime-local" name="fimPeriodo" value={filters.fimPeriodo} variant="standard"
            onChange={handleChange} /></label>

        <label>Data Finalizado inicial:  
          <TextField type="datetime-local" name="dataFinalizadoInicio" value={filters.dataFinalizadoInicio} variant="standard"
            onChange={handleChange} /></label>
        <label>Data Finalizado final:  
          <TextField type="datetime-local" name="dataFinalizadoFim" value={filters.dataFinalizadoFim} variant="standard"
            onChange={handleChange} /></label>

        <label>Data Entrega inicial: 
          <TextField type="datetime-local" name="dataEntregueInicio" value={filters.dataEntregueInicio} variant="standard"
            onChange={handleChange} /></label>

        <label>Data Entrega final: 
          <TextField type="datetime-local" name="dataEntregueFim" value={filters.dataEntregueFim} variant="standard"
            onChange={handleChange} /></label>
      </div>
      <div className="filter-container-pai" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        <FormControl>
          <label>Cliente</label>
          <Select
            name="cliente"
            variant="outlined"
            value={filters.cliente || ""} // "" como valor padrão para vazio
            onChange={handleChange}
            displayEmpty // Mostra o placeholder mesmo quando o valor está vazio
            sx={{
              backgroundColor: '#F0F8FF',
              '&:hover': {                // Estilo ao passar o mouse
                borderColor: 'blue',
              },
              '& .MuiOutlinedInput-notchedOutline': { // Garante que funcione com variant="outlined"
                border: "0.5px solid black",
              },
            }}
            multiple
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Todos</em>; // Mostra "Todos" como padrão
              }
              return clientes
                .filter((cliente) => selected.includes(cliente.id_cliente))
                .map((cliente) => cliente.nome)
                .join(", "); // Mostra os valores selecionados
            }}
          >
            {clientes.map((cliente) => (
              <MenuItem key={cliente.id_cliente} value={cliente.id_cliente}>
                {cliente.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <label>Usuário</label>
          <Select
            name="usuario"
            variant="outlined"
            value={filters.usuario || ""} // "" como valor padrão para vazio
            onChange={handleChange}
            displayEmpty
            sx={{
              backgroundColor: '#F0F8FF',
              '&:hover': {                // Estilo ao passar o mouse
                borderColor: 'blue',
              },
              '& .MuiOutlinedInput-notchedOutline': { // Garante que funcione com variant="outlined"
                border: "0.5px solid black",
              },
            }}
          >
            <MenuItem disabled value="">
              <em>Todos</em> {/* Texto padrão quando vazio */}
            </MenuItem>
            {usuarios.map((usuario) => (
              <MenuItem key={usuario.id_usuario} value={usuario.id_usuario}>
                {usuario.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <label>Produto:</label>
          <Select
            name="produto"
            variant="outlined"
            value={filters.produto || ""}
            onChange={handleChange}
            displayEmpty
            sx={{
              backgroundColor: "#F0F8FF",
              '&:hover': {                // Estilo ao passar o mouse
                borderColor: 'blue',
              },
              '& .MuiOutlinedInput-notchedOutline': { // Garante que funcione com variant="outlined"
                border: "0.5px solid black",
              },
            }}
            multiple
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Todos</em>;
              }
              return produtos
                .filter((produto) => selected.includes(produto.id_produto))
                .map((produto) => produto.nome)
                .join(", ");
            }}
          >
            {produtos.map((produto) => (
              <MenuItem key={produto.id_produto} value={produto.id_produto}>
                {produto.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <label>Status:</label>
          <Select
            name="status"
            variant="outlined"
            value={filters.status || ""} // "" como valor padrão para vazio
            onChange={handleChange}
            displayEmpty
            sx={{
              backgroundColor: '#F0F8FF',
              '&:hover': {                // Estilo ao passar o mouse
                borderColor: 'blue',
              },
              '& .MuiOutlinedInput-notchedOutline': { // Garante que funcione com variant="outlined"
                border: "0.5px solid black",
              },
            }}
          >
            <MenuItem disabled value="">
              <em>Todos</em> {/* Texto padrão quando vazio */}
            </MenuItem>
            {statusOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <label>Tipo:</label>

          <Select
            name="tipoPedido"
            variant="outlined"
            value={filters.tipoPedido || ""}
            onChange={handleChange}
            displayEmpty
            sx={{
              backgroundColor: "#F0F8FF",
              '&:hover': {                // Estilo ao passar o mouse
                borderColor: 'blue',
              },
              '& .MuiOutlinedInput-notchedOutline': { // Garante que funcione com variant="outlined"
                border: "0.5px solid black",
              },
            }}
            multiple
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Todos</em>;
              }
              return tipoPedidoOptions
                .filter((option) => selected.includes(option.id))
                .map((option) => option.label)
                .join(", ");
            }}
          >
            {tipoPedidoOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="actions" style={{ marginTop: "20px" }}>
        <button className="voltar" onClick={handleResetFilters}>
          Limpar Filtros
        </button>
        <button className="voltar2" onClick={generateReportHandler}>
          Gerar Relatorio
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <button className="voltar" onClick={handleClick}>
        Voltar
      </button>

      {showSairModal &&
       
       
       <div className="modal">
         <div className="modal-content">
           <button className="close-modal" onClick={handleCancelExit}>X</button>
           <h2 style={{ textAlign: 'center' }}>Dados não salvos!</h2>
           <p style={{ textAlign: 'center' }}>Dados não salvos! Seus dados não serão salvos se não confirmar o envio.</p>
           <div className="modal-div">
             <button className="modal-button" onClick={handleConfirmExit}>Sair</button>
             <button className="modal-button" onClick={handleCancelExit}>Ficar</button>
           </div>
         </div>
       </div>
       
   }
    </div>
  );
};

export default RelatorioPedido;
