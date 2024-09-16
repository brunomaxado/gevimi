import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../style.css'; // Certifique-se de importar o arquivo CSS

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
  const [modalType, setModalType] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Barra de pesquisa
  const [sortConfig, setSortConfig] = useState(null); // Configuração de ordenação
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
  const [itemsPerPage] = useState(10); // Itens por página

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPedidos = async () => {
      try {
        const res = await axios.get("http://localhost:8800/pedido");
        setPedidos(res.data);
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

  const calcularTotalItens = (itensPedido) => {
    return itensPedido.reduce((total, item) => {
      return total + (item.preco_unitario_atual * item.quantidade);
    }, 0);
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
        case 1: return "Finalizado";
        case 2: return "Em andamento";
        case 3: return "Não finalizado";
        default: return "Desconhecido";
    }
  };

  const getTipoEntrega = (tipoEntrega) => {
    switch (tipoEntrega) {
      case 1: return "Entrega";
      case 2: return "Entrega iFood";
      case 3: return "Retirada";
      default: return "Desconhecido";
    }
  };

  const handleClickFinalizar = (id) => {
    setSelectedPedidoId(id);
    setModalType("finalizar");
    setShowModal(true);
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

      setPedidos(pedidos.map(pedido =>
        pedido.id_pedido === selectedPedidoId
          ? { ...pedido, status: 1, data_finalizado: currentDate }
          : pedido
      ));

      showSuccess("Pedido finalizado com sucesso.");
      setShowModal(false);
    } catch (err) {
      console.error("Erro ao finalizar o pedido:", err);
      setError("Erro ao finalizar o pedido.");
      setShowModal(false);
    }
  };

  const handleCancelar = async () => {
    try {
      await axios.delete(`http://localhost:8800/pedido/${selectedPedidoId}`);
      setPedidos(pedidos.filter(pedido => pedido.id_pedido !== selectedPedidoId));
      showSuccess("Pedido cancelado com sucesso.");
      setShowModal(false);
    } catch (err) {
      console.error("Erro ao cancelar o pedido:", err);
      setError("Erro ao cancelar o pedido.");
      setShowModal(false);
    }
  };

  const handleConfirm = () => {
    if (modalType === "finalizar") {
      handleFinalizar();
    } else if (modalType === "cancelar") {
      handleCancelar();
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  // Função para organizar os dados com base na coluna
  const sortData = (key) => {
    let sortedPedidos = [...pedidos];
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      sortedPedidos.reverse();
      setSortConfig({ key, direction: "desc" });
    } else {
      sortedPedidos.sort((a, b) => {
        if (key === "cliente") {
          return getClienteNome(a.fk_id_cliente).localeCompare(getClienteNome(b.fk_id_cliente));
        } else if (key === "data_para_entregar" || key === "data_finalizado") {
          return new Date(a[key]) - new Date(b[key]);
        }
        return 0;
      });
      setSortConfig({ key, direction: "asc" });
    }
    setPedidos(sortedPedidos);
  };

  // Função de mudança de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filtrando os pedidos com base na pesquisa
  const filteredPedidos = pedidos.filter((pedido) =>
    getClienteNome(pedido.fk_id_cliente).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculando os índices para a paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPedidos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPedidos.length / itemsPerPage);

  return (
    <div className="tabela">
      <h1>Pedidos e Itens</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Barra de Pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar por nome do cliente"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="sort-buttons">
        <button onClick={() => sortData("cliente")}>Ordenar por Cliente</button>
        <button onClick={() => sortData("data_para_entregar")}>Ordenar por Data de Entrega</button>
        <button onClick={() => sortData("data_finalizado")}>Ordenar por Data de Finalização</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Forma de Pagamento</th>
            <th>Produto/xUnidade</th>
            <th>Total</th>
            <th>Data de Entrega</th>
            <th>Data de Realização</th>
            <th>Data Finalizado</th>
            <th>Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((pedido) => (
            <tr key={pedido.id_pedido}>
              <td>{pedido.id_pedido}</td>
              <td>{getClienteNome(pedido.fk_id_cliente)}</td>
              <td>{getTipoEntrega(pedido.tipo)}</td>
              <td>{getStatus(pedido.status)}</td>
              <td>{getFormaPagamento(pedido.forma_pagamento)}</td>
              <td>
                {pedido.itensPedido.map((item) => (
                  <div key={item.id_item_pedido}>
                    {getProdutoNome(item.fk_id_produto)} x{item.quantidade};
                  </div>
                ))}
              </td>
              <td>R${calcularTotalItens(pedido.itensPedido).toFixed(2)}</td>
              <td>
                {pedido.data_para_entregar && !isNaN(Date.parse(pedido.data_para_entregar))
                  ? new Date(pedido.data_para_entregar).toLocaleString()
                  : "Sem data"}
              </td>
              <td>{new Date(pedido.data_realizado).toLocaleString()}</td>
              <td>{pedido.data_finalizado ? new Date(pedido.data_finalizado).toLocaleString() : "Não finalizado"}</td>
              <td>{getUsuarioNome(pedido.fk_id_usuario)}</td>
              <td>
                <button className="delete" onClick={() => handleClickCancelar(pedido.id_pedido)}>Cancelar</button>
                <button className="update">
                  <Link to={`/readPedido/${pedido.id_pedido}`}>Visualizar</Link>
                </button>
                <button
                  className={pedido.status === 1 ? "finalizar button-disabled" : "finalizar"}
                  onClick={() => handleClickFinalizar(pedido.id_pedido)}
                  disabled={pedido.status === 1}
                >
                  Finalizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="pagination">
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={currentPage === number + 1 ? "active" : ""}
          >
            {number + 1}
          </button>
        ))}
      </div>

      {/* Modal de confirmação */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Ação</h2>
            <p>
              {modalType === "finalizar"
                ? "Tem certeza que deseja finalizar o pedido?"
                : "Tem certeza que deseja cancelar o pedido?"}
            </p>
            <div className="modal-buttons">
              <button className="confirm" onClick={handleConfirm}>Sim</button>
              <button className="cancel" onClick={handleCancel}>Não</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de sucesso */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{successMessage}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadPedido;
