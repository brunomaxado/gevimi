import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../style.css'; // Certifique-se de importar o arquivo CSS
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search'; // Importando o ícone de pesquisa

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReadPedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPedidoId, setSelectedPedidoId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalFinalizar, setShowModalFinalizar] = useState(false);
  const [modalType, setModalType] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Barra de pesquisa
  const [sortConfig, setSortConfig] = useState(null); // Configuração de ordenação
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
  const [itemsPerPage] = useState(20); // Itens por página
  const [statusFilter, setStatusFilter] = useState(""); // Estado para o filtro de status
  const [tipoFilter, setTipoFilter] = useState(""); // Estado para o filtro de tipo de entrega

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPedidos = async () => {
      try {
        const res = await axios.get("http://localhost:8800/pedido");
        const sortedPedidos = res.data.sort((a, b) => new Date(b.data_realizado) - new Date(a.data_realizado));
      
        setPedidos(sortedPedidos);
       
      } catch (err) {
        console.log(err);
      }
    };

    const fetchClientes = async () => { 
      try {
        const response = await axios.get("http://localhost:8800/allcliente");
        setClientes(response.data); 
      } catch (err) {
        console.log(err);
      }
    };

    const fetchUsuarios = async () => { 
      try {
        const response = await axios.get("http://localhost:8800/usuario");
        setUsuarios(response.data); 
      } catch (err) {
        console.log(err);
      }
    };
    const handleDeleteClick = (id) => {
      setSelectedPedidoId(id);
      setShowModal(true);
      setErrorMessage(" ");
    };
    
    const fetchProdutos = async () => { 
      try {
        const response = await axios.get("http://localhost:8800/allprodutos");
        setProdutos(response.data); 
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllPedidos();
    fetchClientes();
    fetchProdutos();
    fetchUsuarios();
  }, []);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      setSuccessMessage(""); 
    }, 2000); 
  };
  const [errorMessage, setErrorMessage] = useState(""); // Estado para a mensagem de erro
  
  const handleClose = () => {
    setShowModal(false);
    setShowModalFinalizar(false);
    setErrorMessage(" ");

  };
  

  const getClienteNome = (id) => {
    const cliente = clientes.find((c) => c.id_cliente === id);
    return cliente ? cliente.nome : "N/A";
  };

  const getUsuarioNome = (id) => {
    const usuario = usuarios.find((u) => u.id_usuario === id);
    return usuario ? usuario.nome : "N/A";
  };

  const getProdutoNome = (id) => {
    const produto = produtos.find((u) => u.id_produto === id); 
    return produto ? produto.nome : "N/A";
  };

  const calcularTotalItens = (itensPedido, frete = 0) => {
    const totalItens = itensPedido.reduce((total, item) => {
      return total + (item.preco_unitario_atual * item.quantidade);
    }, 0);
    
    return totalItens + frete;
  };
  
  

  const getFormaPagamento = (formaPagamento) => {
    switch (formaPagamento) {
      case 1: return "Dinheiro";
      case 2: return "Pix";
      case 3: return "Débito";
      case 4: return "Crédito";
      default: return "Desconhecido";
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case 1:
        return <span className="status status-finalizado">Finalizado</span>;
      case 2:
        return <span className="status status-em-andamento">Andamento</span>;
      case 3:
        return <span className="status status-nao-finalizado">Pendente</span>;
      default:
        return <span className="status status-desconhecido">Desconhecido</span>;
    }
  };
 // Função para gerar o PDF com cabeçalho e imagem
// Função para gerar o PDF com espaço reservado para o cabeçalho e imagem
const generatePDF = () => {
  const doc = new jsPDF();

  // Reservando espaço para a imagem no cabeçalho
  // Espaço vazio: doc.rect(x, y, width, height) cria um retângulo invisível onde a imagem deve estar
  doc.rect(14, 10, 30, 10); // Defina x, y, largura, altura

  // Adicionando o texto do cabeçalho
  doc.setFontSize(18);
  doc.text("Relatório de Pedidos", 50, 15);
  
  // Adicionando a data de geração do relatório
  doc.setFontSize(11);
  const date = new Date().toLocaleString();
  doc.text(`Data: ${date}`, 50, 23);

  // Configurando as colunas e linhas da tabela
  const tableColumn = ["Cliente", "Tipo", "Produto", "Data de Entrega", "Status", "Finalizado em", "Total"];
  const tableRows = [];

  // Mapeando dados da tabela para adicionar no PDF
  pedidos.forEach((pedido) => {
    const pedidoData = [
      pedido.cliente,
      pedido.tipo,
      pedido.produto,
      pedido.data_para_entregar || "Sem data",
      pedido.status,
      pedido.data_finalizado || "Não finalizado",
     
    ];
    tableRows.push(pedidoData);
  });

  // Adicionando a tabela no PDF com espaçamento do cabeçalho
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30, // Define o ponto de partida da tabela
  });

  // Baixando o PDF
  doc.save("pedidos.pdf");
};

  
  const getTipoEntrega = (tipoEntrega) => {
    switch (tipoEntrega) {
      case 1:
        return <span className="tipo-entrega tipo-entrega-entrega">Entrega</span>;
      case 2:
        return <span className="tipo-entrega tipo-entrega-ifood">iFood</span>;
      case 3:
        return <span className="tipo-entrega tipo-entrega-retirada">Retirada</span>;
        case 4:
          return <span className="tipo-entrega tipo-entrega-comum">Comum</span>;
      default:
        return <span className="tipo-entrega tipo-entrega-desconhecido">Desconhecido</span>;
    }
  };
  

  const handleClickFinalizar = (id) => {
    setSelectedPedidoId(id);
    setShowModalFinalizar(true);
    setErrorMessage(" ");
  };   
  const handleClickCancelar = (id) => {
    setSelectedPedidoId(id);
    setModalType("cancelar");
    setShowModal(true);
  };

  const handleFinalizar = async () => {
    try {
      const currentDate = new Date().toISOString();
  
      await axios.put(`http://localhost:8800/pedido/${selectedPedidoId}`, { 
        status: 1,
        data_finalizado: currentDate
      });
  
      // Atualiza o pedido na lista de pedidos
      setPedidos(pedidos.map(pedido =>
        pedido.id_pedido === selectedPedidoId
          ? { ...pedido, status: 1, data_finalizado: currentDate }
          : pedido
      ));
  
      showSuccess("Pedido finalizado com sucesso!"); // Chama só uma vez
      setShowModalFinalizar(false); // Fecha o modal de finalizar pedido
  
    } catch (err) {
      console.error("Erro ao finalizar o pedido:", err);
      const errorMessage = err.response?.data?.message || "Erro ao finalizar o pedido.";
      setErrorMessage(errorMessage);
      setShowModalFinalizar(true); // Mantém o modal de erro aberto
    }
  };
  
  


  const handleDelete= async () => {
    try {
      await axios.delete(`http://localhost:8800/pedido/${selectedPedidoId}`);
      setPedidos(pedidos.filter(pedido => pedido.id_pedido !== selectedPedidoId));
      showSuccess("Pedido deletado com sucesso!");
      setShowModal(false);
    } catch (err) {
      console.log(err);
      
      // Captura a mensagem de erro enviada pelo backend, caso exista
      const errorMessage = err.response?.data?.message || "Erro ao deletar o pedido";
      setErrorMessage(errorMessage);
      
      // Exibe o modal com a mensagem de erro
      setShowModal(true);
    }
  };


  const handleCancel = () => {
    setShowModal(false);
    setShowModalFinalizar(false);
  };

  // Função para organizar os dados com base na coluna
  const sortData = (key) => {
    let sortedPedidos = [...pedidos];
    if (key === "data_realizado" || !key) {
      sortedPedidos.sort((a, b) => new Date(b.data_realizado) - new Date(a.data_realizado));
    } else if (key === "cliente") {
      sortedPedidos.sort((a, b) => getClienteNome(a.fk_id_cliente).localeCompare(getClienteNome(b.fk_id_cliente)));
    } else if (key === "data_para_entregar" || key === "data_finalizado") {
      sortedPedidos.sort((a, b) => new Date(a[key]) - new Date(b[key]));
    }
    setPedidos(sortedPedidos);
  };
  

  // Função de mudança de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
// Função para atualizar o termo de pesquisa e redefinir a página
const handleSearchTermChange = (e) => {
  setSearchTerm(e.target.value);
  setCurrentPage(1); // Reset para a primeira página
};

// Função para filtrar os pedidos com base na pesquisa e outros filtros
const filteredPedidos = pedidos.filter((pedido) => {
  const matchesSearch = getClienteNome(pedido.fk_id_cliente).toLowerCase().includes(searchTerm.toLowerCase());
  const matchesStatus = statusFilter ? pedido.status === parseInt(statusFilter) : true;
  const matchesTipo = tipoFilter ? pedido.tipo === parseInt(tipoFilter) : true;
  return matchesSearch && matchesStatus && matchesTipo;
});

// Calculando os índices para a paginação
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredPedidos.slice(indexOfFirstItem, indexOfLastItem); // Paginação após a filtragem
const totalPages = Math.ceil(filteredPedidos.length / itemsPerPage);
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <div> <h1>Pedidos</h1> 

    <div className="tabela">
      
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Barra de Pesquisa */}

      <div className="filters-container">
  <div className="search-box">
    <label><SearchIcon className="search-icon" />  Pesquisar:</label>
   
    <input
  type="text"
  placeholder="Pesquisar cliente..."
  value={searchTerm}
  onChange={handleSearchTermChange} // Chamada da função que redefine a página para 1
  className="search-bar"
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
 {/* <button onClick={() => sortData("data_finalizado")}>Ordenar por Data de Finalização</button>  */}
  <button 
    className="limpar-filtro" 
    onClick={() => {
      setSearchTerm("");
      setStatusFilter("");
      setTipoFilter("");
    }}
  >
    Limpar Filtros
  </button>
  <button className="adicionar" onClick={() => navigate('/pedido')}>
      Novo Pedido
    </button>
</div>

      {/*}

      <div className="sort-buttons">
        <button onClick={() => sortData("cliente")}>Ordenar por Cliente</button>
        <button onClick={() => sortData("data_para_entregar")}>Ordenar por Data de Entrega</button>
        <button onClick={() => sortData("data_finalizado")}>Ordenar por Data de Finalização</button>
      </div>  */}

      <table>
        <thead>
          <tr>
     
            <th class= "coluna-cliente">Cliente</th>
            <th class = "coluna-center">Tipo</th>
            <th class= "carrinho">Produto</th>
       
            <th class= "coluna-data">Data de Entrega</th>
            <th class = "coluna-status">Status</th>
            <th class = "coluna-center">Finalizado em</th>
            <th class ="coluna-preco">Total</th>
            <th class = "coluna-center">Ações</th>
            
          </tr>
        </thead>
        <tbody>
          {currentItems.map((pedido) => (
            <tr key={pedido.id_pedido}>
            
              <td>{getClienteNome(pedido.fk_id_cliente)}</td>
              <td class = "coluna-center">{getTipoEntrega(pedido.tipo)}</td>
              <td>
  {pedido.itensPedido.map((item) => (
    <div key={item.id_item_pedido}>
      {getProdutoNome(item.fk_id_produto)} - x{item.quantidade};
    </div>
  ))}
  {pedido.frete>0 && (
    <div>
      Frete - x1;
    </div>
  )}
</td>

             
              <td>
  {pedido.data_para_entregar && !isNaN(Date.parse(pedido.data_para_entregar))
    ? new Date(pedido.data_para_entregar).toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Altera para 12 horas, se necessário
      })
    : "Sem data"}
</td>


               <td class = "coluna-center">{getStatus(pedido.status)}</td>

              <td class = "coluna-center"> {pedido.data_finalizado ? new Date(pedido.data_finalizado).toLocaleDateString() : ""}</td>
              <td className="coluna-preco">R$ {calcularTotalItens(pedido.itensPedido, pedido.frete || 0).toFixed(2)}</td>


              <td class = "coluna-center">

  <div className="action-icons">
        {/* Ícone de visualizar */}
        
    {/* Ícone de deletar */}

    {pedido.status !== 1 && (
      <span
        className="action-icon delete"
        onClick={() => handleClickCancelar(pedido.id_pedido)}
        title="Cancelar"
      >
        <DeleteIcon />
      </span>
    )}
<Link
      to={`/readPedido/${pedido.id_pedido}`}
      title="Visualizar"
      className="action-icon visualizar"
      style={{ textDecoration: 'none' }}
    >
      <VisibilityIcon />
    </Link>

    {/* Ícone de finalizar */}
    {pedido.status !== 1 && (
      <span
        className="action-icon finalizar"
        onClick={() => handleClickFinalizar(pedido.id_pedido)}
        title="Finalizar"
      >
        <EditIcon />
      </span>
    )}
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generatePDF}>Gerar PDF</button>
      {/* Paginação */}
      <div className="pagination">
  {/* Botão "Anterior" - Renderizado apenas se não for a primeira página */}
  {currentPage !== 1 && (
    <button onClick={() => paginate(currentPage - 1)}>
      <ion-icon name="caret-back-outline"></ion-icon>
    </button>
  )}

  <span>  {currentPage} de {totalPages}   </span>

  {/* Botão "Próximo" - Renderizado apenas se não for a última página */}
  {currentPage !== totalPages && (
    <button onClick={() => paginate(currentPage + 1)}>
      <ion-icon name="caret-forward-outline"></ion-icon>
    </button>
  )}
</div>


  
    </div>

    {showSuccessModal && (
          <div className="success-modal">
            <div className="success-modal-content">
            <span>{successMessage}</span>
            </div>
          </div>
        )}
    {showModal && (
  <div className="modal">
    <div className="modal-content">
      <button className="close-modal" onClick={handleClose}>X</button> {/* Botão de fechar */}
      <h2>Confirmar Exclusão</h2>
      <p>Tem certeza que deseja excluir o pedido?</p>
      
      {/* Mensagem de erro, que aparecerá caso haja algum erro */}
      {errorMessage && (
  <div className="error-message show">
    {errorMessage}
  </div>
)}


      <div className="modal-div">
        <button className="modal-button" onClick={handleDelete}>Sim</button>
        <button className="modal-button" onClick={handleCancel}>Não</button>
      </div>
    </div>
  </div>
)}

{showModalFinalizar && (
  <div className="modal">
    <div className="modal-content">
      <button className="close-modal" onClick={handleClose}>X</button>
      <h2>Confirmar Finalização</h2>
      <p>Tem certeza que deseja finalizar o pedido?</p>
      
      {errorMessage && (
        <div className="error-message show">
          {errorMessage}
        </div>
      )}

      <div className="modal-div">
        <button className="modal-button" onClick={handleFinalizar}>Sim</button> {/* Corrigido */}
        <button className="modal-button" onClick={handleCancel}>Não</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ReadPedido;
