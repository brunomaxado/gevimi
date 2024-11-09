import React, { useState, useEffect } from "react";
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
  const [statusFilter, setStatusFilter] = useState([]);
  const [tipoFilter, setTipoFilter] = useState([]);
  const [pagamentoFilter, setPagamentoFilter] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    statusFilter: [],
    tipoFilter: [],
    pagamentoFilter: [],
    inicioPeriodo: "",
    fimPeriodo: "",
    inicioDataEntrega: "",
    fimDataEntrega: "",
    inicioFinalizado: "",
    fimFinalizado: "",
  });

  // Estado para modais
  const [showClienteModal, setShowClienteModal] = useState(false);
  const [showUsuarioModal, setShowUsuarioModal] = useState(false);
  const [showTipoModal, setShowTipoModal] = useState(false);
  const [showPagamentoModal, setShowPagamentoModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState([]);
  const [selectedPagamento, setSelectedPagamento] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  // Filtros de data
  const [inicioPeriodo, setInicioPeriodo] = useState("");
  const [fimPeriodo, setFimPeriodo] = useState("");
  const [inicioDataEntrega, setInicioDataEntrega] = useState("");
  const [fimDataEntrega, setFimDataEntrega] = useState("");
  const [inicioFinalizado, setInicioFinalizado] = useState("");
  const [fimFinalizado, setFimFinalizado] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch clientes
    axios.get("http://localhost:8800//cliente")
      .then(response => setClientes(response.data))
      .catch(error => console.error("Erro ao buscar clientes:", error));

    // Fetch usuários
    axios.get("http://localhost:8800//usuario")
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Erro ao buscar usuários:", error));
  }, []);

  // Função para gerar o JSON dos filtros
  const generateFilters = () => {
    return {
      cliente: selectedCliente,
      status: selectedStatus,
      tipo: selectedTipo,
      pagamento: selectedPagamento,
      inicioPeriodo,
      fimPeriodo,
      inicioDataEntrega,
      fimDataEntrega,
      inicioFinalizado,
      fimFinalizado
    };
  };

  // Função para aplicar filtros
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
    setStatusFilter([]);
    setTipoFilter([]);
    setPagamentoFilter([]);
    setInicioPeriodo("");
    setFimPeriodo("");
    setInicioDataEntrega("");
    setFimDataEntrega("");
    setInicioFinalizado("");
    setFimFinalizado("");
  };

  // Função para fechar os modais
  const closeClienteModal = () => setShowClienteModal(false);
  const closeUsuarioModal = () => setShowUsuarioModal(false);
  const closeTipoModal = () => setShowTipoModal(false);
  const closePagamentoModal = () => setShowPagamentoModal(false);
  const closeStatusModal = () => setShowStatusModal(false);
console.log(filters);
  // Função de handleChange para o gerenciamento do estado dos filtros

  // Função de handleChange para o gerenciamento do estado dos filtros
const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  
  return (
    <div>
      <h1>Relatório de Pedidos</h1>
  
      <div className="filters-container">
        {/* Filtros de Período e Data */}
        <div>
          <label> Início Período Realizado: <span className="asterisco">*</span> </label>
          <input 
            type="datetime-local" 
            value={filters.inicioPeriodo} 
            onChange={handleChange} 
            name="inicioPeriodo" 
          />
        </div>
        <div>
          <label> Fim Período Realizado: <span className="asterisco">*</span> </label>
          <input 
            type="datetime-local" 
            value={filters.fimPeriodo} 
            onChange={handleChange} 
            name="fimPeriodo" 
          />
        </div>
  
        {/* Filtros de Data de Entrega */}
        <div>
          <label> Início Data Entrega: </label>
          <input 
            type="datetime-local" 
            value={filters.inicioDataEntrega} 
            onChange={handleChange} 
            name="inicioDataEntrega" 
          />
        </div>
        <div>
          <label> Fim Data Entrega: </label>
          <input 
            type="datetime-local" 
            value={filters.fimDataEntrega} 
            onChange={handleChange} 
            name="fimDataEntrega" 
          />
        </div>
  
        {/* Filtros de Data de Finalização */}
        <div>
          <label> Início Data Finalizado: </label>
          <input 
            type="datetime-local" 
            value={filters.inicioFinalizado} 
            onChange={handleChange} 
            name="inicioFinalizado" 
          />
        </div>
        <div>
          <label> Fim Data Finalizado: </label>
          <input 
            type="datetime-local" 
            value={filters.fimFinalizado} 
            onChange={handleChange} 
            name="fimFinalizado" 
          />
        </div>
      </div>
  
      {/* Seletor de Status */}
      <div>
        <button onClick={() => setShowStatusModal(true)}>Selecionar Status</button>
      </div>
  
      {/* Seletor de Tipo de Pedido */}
      <div>
        <button onClick={() => setShowTipoModal(true)}>Selecionar Tipo de Pedido</button>
      </div>
  
      {/* Seletor de Forma de Pagamento */}
      <div>
        <button onClick={() => setShowPagamentoModal(true)}>Selecionar Forma de Pagamento</button>
      </div>
  
      {/* Seletor de Cliente */}
      <div>
        <button onClick={() => setShowClienteModal(true)}>Selecionar Cliente</button>
      </div>
  
      {/* Seletor de Usuário */}
      <div>
        <button onClick={() => setShowUsuarioModal(true)}>Selecionar Usuário</button>
      </div>
  
      {/* Modal Seleção de Status */}
      {showStatusModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeStatusModal}>X</button>
            <h2>Selecionar Status</h2>
            <div>
              <label>
                <input 
                  type="checkbox" 
                  name="status" 
                  value="Pendente" 
                  onChange={() => setSelectedStatus(prev => prev.includes('Pendente') ? prev.filter(status => status !== 'Pendente') : [...prev, 'Pendente'])} 
                />
                Pendente
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="status" 
                  value="Finalizado" 
                  onChange={() => setSelectedStatus(prev => prev.includes('Finalizado') ? prev.filter(status => status !== 'Finalizado') : [...prev, 'Finalizado'])} 
                />
                Finalizado
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="status" 
                  value="Cancelado" 
                  onChange={() => setSelectedStatus(prev => prev.includes('Cancelado') ? prev.filter(status => status !== 'Cancelado') : [...prev, 'Cancelado'])} 
                />
                Cancelado
              </label>
            </div>
            <div className="modal-actions">
              <button className="modal-button" onClick={closeStatusModal}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
  
      {/* Modal Seleção de Tipo de Pedido */}
      {showTipoModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeTipoModal}>X</button>
            <h2>Selecionar Tipo de Pedido</h2>
            <div>
              <label>
                <input 
                  type="checkbox" 
                  name="tipo" 
                  value="Retirada" 
                  onChange={() => setSelectedTipo(prev => prev.includes('Retirada') ? prev.filter(tipo => tipo !== 'Retirada') : [...prev, 'Retirada'])} 
                />
                Retirada
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="tipo" 
                  value="Local" 
                  onChange={() => setSelectedTipo(prev => prev.includes('Local') ? prev.filter(tipo => tipo !== 'Local') : [...prev, 'Local'])} 
                />
                Local
              </label>
            </div>
            <div className="modal-actions">
              <button className="modal-button" onClick={closeTipoModal}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
  
      {/* Modal Seleção de Forma de Pagamento */}
      {showPagamentoModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closePagamentoModal}>X</button>
            <h2>Selecionar Forma de Pagamento</h2>
            <div>
              <label>
                <input 
                  type="checkbox" 
                  name="pagamento" 
                  value="Cartão" 
                  onChange={() => setSelectedPagamento(prev => prev.includes('Cartão') ? prev.filter(pag => pag !== 'Cartão') : [...prev, 'Cartão'])} 
                />
                Cartão
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="pagamento" 
                  value="Dinheiro" 
                  onChange={() => setSelectedPagamento(prev => prev.includes('Dinheiro') ? prev.filter(pag => pag !== 'Dinheiro') : [...prev, 'Dinheiro'])} 
                />
                Dinheiro
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="pagamento" 
                  value="Pix" 
                  onChange={() => setSelectedPagamento(prev => prev.includes('Pix') ? prev.filter(pag => pag !== 'Pix') : [...prev, 'Pix'])} 
                />
                Pix
              </label>
            </div>
            <div className="modal-actions">
              <button className="modal-button" onClick={closePagamentoModal}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
  
      {/* Modal Seleção de Cliente */}
      {showClienteModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeClienteModal}>X</button>
            <h2>Selecionar Cliente</h2>
            <div>
              {clientes.map(cliente => (
                <label key={cliente.id}>
                  <input 
                    type="checkbox" 
                    name="cliente" 
                    value={cliente.id} 
                    onChange={() => {
                      setSelectedCliente(prev => prev.includes(cliente.id)
                        ? prev.filter(id => id !== cliente.id)
                        : [...prev, cliente.id]);
                    }} 
                  />
                  {cliente.nome}
                </label>
              ))}
            </div>
            <div className="modal-actions">
              <button className="modal-button" onClick={closeClienteModal}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
  
      {/* Modais para outros campos seguem a mesma lógica */}
  
      <div className="actions">
        <button onClick={applyFilters}>Aplicar Filtros</button>
        <button onClick={clearFilters}>Limpar Filtros</button>
      </div>
    </div>
  );
  
  
};

export default RelatorioPedido;
