import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../style.css'; // Certifique-se de importar o arquivo CSS
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search'; // Importando o ícone de pesquisa

import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const RelatorioPedido = (props) => {
  const navigate = useNavigate();
  
  // Estados para os filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [tipoFilter, setTipoFilter] = useState("");

  // Filtros de data
  const [inicioPeriodo, setInicioPeriodo] = useState("");
  const [fimPeriodo, setFimPeriodo] = useState("");
  const [inicioDataEntrega, setInicioDataEntrega] = useState("");
  const [fimDataEntrega, setFimDataEntrega] = useState("");
  const [inicioFinalizado, setInicioFinalizado] = useState("");
  const [fimFinalizado, setFimFinalizado] = useState("");

  // Função para gerar o JSON dos filtros
  const generateFilters = () => {
    return {
      cliente: searchTerm,
      status: statusFilter,
      tipo: tipoFilter,
      inicioPeriodo,
      fimPeriodo,
      inicioDataEntrega,
      fimDataEntrega,
      inicioFinalizado,
      fimFinalizado
    };
  };

  // Função para enviar os filtros para o backend
  const applyFilters = async () => {
    const filters = generateFilters();
    try {
      const response = await axios.get("http://localhost:8800/relatorioPedido", {
        params: filters, // Passando os filtros como parâmetros
      });
      console.log(response.data); // Exibir os dados retornados, você pode atualizar o estado de pedidos aqui
    } catch (error) {
      console.error("Erro ao aplicar filtros:", error);
    }
  };

  // Função para limpar os filtros
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setTipoFilter("");
    setInicioPeriodo("");
    setFimPeriodo("");
    setInicioDataEntrega("");
    setFimDataEntrega("");
    setInicioFinalizado("");
    setFimFinalizado("");
  };

  return (
    <div>
      <h1>Relatório de Pedidos</h1>

      <div className="filters-container">
        {/* Filtro de Periodo Realizado */}
        <div>
          <label> Início Período Realizado: <span className="asterisco">*</span> </label>
          <input
            type="datetime-local"
            value={inicioPeriodo}
            onChange={(e) => setInicioPeriodo(e.target.value)}
            name="inicioPeriodo"
          />
        </div>
        <div>
          <label> Fim Período Realizado: <span className="asterisco">*</span> </label>
          <input
            type="datetime-local"
            value={fimPeriodo}
            onChange={(e) => setFimPeriodo(e.target.value)}
            name="fimPeriodo"
          />
        </div>

        {/* Filtro de Data de Entrega */}
        <div>
          <label> Início Data de Entrega: <span className="asterisco">*</span> </label>
          <input
            type="datetime-local"
            value={inicioDataEntrega}
            onChange={(e) => setInicioDataEntrega(e.target.value)}
            name="inicioDataEntrega"
          />
        </div>
        <div>
          <label> Fim Data de Entrega: <span className="asterisco">*</span> </label>
          <input
            type="datetime-local"
            value={fimDataEntrega}
            onChange={(e) => setFimDataEntrega(e.target.value)}
            name="fimDataEntrega"
          />
        </div>
      </div>

      <div className="filters-container">
        {/* Filtro de Finalização */}
        <div>
          <label> Início Finalizado: <span className="asterisco">*</span> </label>
          <input
            type="datetime-local"
            value={inicioFinalizado}
            onChange={(e) => setInicioFinalizado(e.target.value)}
            name="inicioFinalizado"
          />
        </div>
        <div>
          <label> Fim Finalizado: <span className="asterisco">*</span> </label>
          <input
            type="datetime-local"
            value={fimFinalizado}
            onChange={(e) => setFimFinalizado(e.target.value)}
            name="fimFinalizado"
          />
        </div>

        {/* Filtro por Status */}
        <div className="filter-box">
          <label>Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="">Todos os Status</option>
            <option value="1">Finalizado</option>
            <option value="2">Em andamento</option>
            <option value="3">Pendente</option>
          </select>
        </div>

        {/* Filtro por Tipo */}
        <div className="filter-box">
          <label>Tipo:</label>
          <select
            value={tipoFilter}
            onChange={(e) => setTipoFilter(e.target.value)}
          >
            <option value="">Todos os tipos</option>
            <option value="1">Entrega</option>
            <option value="2">iFood</option>
            <option value="3">Retirada</option>
            <option value="4">Comum</option>
          </select>
        </div>

        {/* Botões de Ação */}
        <div className="filter-actions">
          <button 
            className="limpar-filtro" 
            onClick={clearFilters} // Limpa os filtros
          >
            Limpar Filtros
          </button>
          <button 
            className="aplicar-filtro" 
            onClick={applyFilters} // Aplica os filtros
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatorioPedido;
