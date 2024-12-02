import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../style.css'; // Certifique-se de importar o arquivo CSS
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search'; // Importando o ícone de pesquisa

import { useModified } from "../context/ModifiedContext";
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
  const { isModified, setIsModified } = useModified(); // Acessando o contexto

  const navigate = useNavigate();
  const now = new Date();

  // Data de início do ano (00:00)
  //const dataRealizadoInicio = new Date(now.getFullYear(), 0, 1, 0, 0).toISOString().split("T")[0] + "T00:00";
  const dataRealizadoInicio = () => {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return new Date(date - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  };
  // Dia atual às 23:59
  // const dataRealizadoFim = now.toISOString().split("T")[0] + "T23:59";
  const dataRealizadoFim = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    date.setHours(23, 59, 59, 999);
    return new Date(date - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  };

  // Data de entrega (hoje - 00:00 até 23:59)
  const entregaInicio = new Date(new Date().setHours(0, 0, 0, 0)).toISOString().split("T")[0] + "T00:00";
  const entregaFim = new Date(new Date().setHours(0, 0, 0, 0)).toISOString().split("T")[0] + "T23:59";


  const [filtros, setFiltros] = useState({
    data_realizado_inicio: dataRealizadoInicio(),
    data_realizado_fim: dataRealizadoFim(),
    data_entrega_inicio: "",
    data_entrega_fim: "",
    tipo: "",
    status: "",
  });
  useEffect(() => {

    setFiltros(filtros);
  }, []);  // Esse useEffect vai rodar apenas uma vez quando o componente for montado

  useEffect(() => {
    const fetchAllPedidos = async () => {
      try {
        const res = await axios.get("http://localhost:8800/pedido", filtros);
        const sortedPedidos = res.data.sort((a, b) => new Date(b.data_realizado) - new Date(a.data_realizado));

        setPedidos(sortedPedidos);

      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPedidos2();
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
    fetchAllPedidos2();
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
  useEffect(() => {
    // Reseta isModified ao desmontar o componente
    return () => {
      setIsModified(false);
    };
  }, [setIsModified]);
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
    // Garantir que o valor do frete seja numérico
    const valorFrete = isNaN(frete) ? 0 : parseFloat(frete);

    // Calcular o total dos itens
    const totalItens = itensPedido.reduce((total, item) => {
      return total + (item.preco_unitario_atual || 0) * (item.quantidade || 0);
    }, 0);

    // Somar o frete ao total
    const totalComFrete = totalItens + valorFrete;

    // Retornar o valor formatado em BRL
    return totalComFrete.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
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
        return <span className="status status-em-andamento">Produção</span>;
      case 3:
        return <span className="status status-nao-finalizado">Pendente</span>;
      default:
        return <span className="status status-desconhecido">Desconhecido</span>;
    }
  };
  // Função para gerar o PDF com cabeçalho e imagem
  // Função para gerar o PDF com espaço reservado para o cabeçalho e imagem

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

  const handleDelete = async () => {
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

  const AplicarFiltroButtonClick = (e) => {
    e.preventDefault();
    const { data_realizado_inicio, data_realizado_fim, data_entrega_inicio, data_entrega_fim, tipo, status } = filtros;
    // conjunto 1 inteiro preenchido, ou conjunto 2 inteiro preenchido
    if (!data_realizado_inicio && !data_realizado_fim && !data_entrega_inicio && !data_entrega_fim) {
      setError("Preencha a data realizado ou data entrega inicial e final.");
      return;
    }
    if ((data_realizado_inicio && !data_realizado_fim) || (!data_realizado_inicio && data_realizado_fim)) {
      setError("Preencha o período realizado inicial e final.");
      return;
    }
    if ((data_entrega_inicio && !data_entrega_fim) || (!data_entrega_inicio && data_entrega_fim)) {
      setError("Preencha o período entrega inicial e final.");
      return;
    }
    setError("");
    fetchAllPedidos2();
    setSearchTerm("");

  };
  const fetchAllPedidos2 = async () => {
    try {
      const res = await axios.get("http://localhost:8800/pedido", {
        params: {
          data_realizado_inicio: filtros.data_realizado_inicio,
          data_realizado_fim: filtros.data_realizado_fim,
          data_entrega_inicio: filtros.data_entrega_inicio,
          data_entrega_fim: filtros.data_entrega_fim,
          tipo: filtros.tipo, // Enviando múltiplos tipos como uma string
          status: filtros.status,
        },
      });
      console.log("Resultado:", res.data);

      if (!res.data || res.data.length === 0) {
        console.log("Nenhum pedido encontrado com os filtros aplicados.");
        setPedidos([]); // Garante que a lista seja vazia na interface
        setError("Nenhum pedido encontrado com os filtros aplicados.");
        return; // Sai da função
      }

      const sortedPedidos = res.data.sort(
        (a, b) => new Date(b.data_realizado) - new Date(a.data_realizado)
      );
      setPedidos(sortedPedidos);
      setError(null); // Limpa qualquer erro anterior
    } catch (err) {
      // Loga o erro detalhado
      console.error("Erro ao buscar os pedidos:", err);

      // Loga a mensagem de erro enviada pelo backend, caso exista
      if (err.response && err.response.data && err.response.data.message) {
        console.error("Mensagem do servidor:", err.response.data.message);
        setError(err.response.data.message); // Exibe a mensagem do backend na interface
      } else {
        // Mensagem padrão se o erro não tiver uma resposta clara do backend
        setError("Erro ao buscar os pedidos. Tente novamente mais tarde.");
      }
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setShowModalFinalizar(false);
  };

  const handleFilterChange = (e) => {
    setIsModified(true);
    console.log("IS MODIFEIS READ PEDIDO:" + isModified);
    const { name, value } = e.target;
    console.log("filter change..");
    setIsModified(true);
    setFiltros((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setIsModified(true);
    console.log("IS MODIFEIS READ PEDIDO:" + isModified);
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
  console.log(filtros);

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
        <div className="filters-container">

          <div className="filter-box">
            <label> Data Realizado Inicio: <span className="asterisco">*</span> </label>
            <input
              type="datetime-local"
              name="data_realizado_inicio"
              value={filtros.data_realizado_inicio}
              onChange={(e) => handleFilterChange(e)}
              className="datetime-input"
            />
          </div>
          <div className="filter-box">
            <label> Data Realizado Fim: <span className="asterisco">*</span> </label>
            <input
              type="datetime-local"
              name="data_realizado_fim"
              value={filtros.data_realizado_fim}
              onChange={(e) => handleFilterChange(e)}
              className="datetime-input"
            />

          </div>

          <div className="filter-box">
            <label> Data Entrega Inicio: <span className="asterisco">*</span> </label>
            <input
              type="datetime-local"
              name="data_entrega_inicio"
              value={filtros.data_entrega_inicio}
              onChange={(e) => handleFilterChange(e)}
              className="datetime-input"
            />
          </div>
          <div className="filter-box">
            <label> Data Entrega Fim: <span className="asterisco">*</span> </label>
            <input
              type="datetime-local"
              name="data_entrega_fim"
              value={filtros.data_entrega_fim}
              onChange={(e) => handleFilterChange(e)}
              className="datetime-input"
            />

          </div>
          <button
            className="limpar-filtro"
            onClick={() => {
              setFiltros(prevFiltros => ({
                ...prevFiltros,  // Mantém os valores anteriores dos filtros
                data_entrega_inicio: entregaInicio,  // Atualiza com a data de início de hoje
                data_entrega_fim: entregaFim,        // Atualiza com a data de fim de hoje
              }));
            }}
          >
            Entrega Hoje
          </button>

        </div>
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
              name="status"
              value={filtros.status}
              onChange={(e) => handleFilterChange(e)}
              className="status-filter"
            >
              <option value="">Todos os Status</option>
              <option value="1">Finalizado</option>
              <option value="2">Produção</option>
              <option value="3">Pendente</option>
            </select>
          </div>

          <div className="filter-box">
            <label>Tipo:</label>
            <select
              name="tipo"
              onChange={(e) => handleFilterChange(e)}
              value={filtros.tipo}

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
              setFiltros({
                data_realizado_inicio: dataRealizadoInicio(),
                data_realizado_fim: dataRealizadoFim(),
                data_entrega_inicio: "",
                data_entrega_fim: "",
                tipo: "",
                status: "",
              });
            }}
          >
            Limpar Filtros
          </button>
          <button className="aplicar-filtro" onClick={AplicarFiltroButtonClick}>Aplicar Filtro</button>


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

              <th class="coluna-cliente">Cliente</th>
              <th class="coluna-center">Tipo</th>
              <th class="carrinho">Produto</th>

              <th class="coluna-data">Data de Entrega</th>
              <th class="coluna-status">Status</th>
              <th class="coluna-center">Finalizado em</th>
              <th class="coluna-preco">Total</th>
              <th class="coluna-center">Ações</th>

            </tr>
          </thead>
          <tbody>
            {currentItems.map((pedido) => (
              <tr key={pedido.id_pedido}>

                <td>{getClienteNome(pedido.fk_id_cliente)}</td>
                <td class="coluna-center">{getTipoEntrega(pedido.tipo)}</td>
                <td>
                  {pedido.itensPedido.map((item) => (
                    <div key={item.id_item_pedido}>
                      {getProdutoNome(item.fk_id_produto)} - x{item.quantidade};
                    </div>
                  ))}
                  {pedido.frete > 0 && (
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

                <td class="coluna-center">{getStatus(pedido.status)}</td>

                <td class="coluna-center"> {pedido.data_finalizado ? new Date(pedido.data_finalizado).toLocaleDateString() : ""}</td>
                <td className="coluna-preco">{calcularTotalItens(pedido.itensPedido, parseFloat(pedido.frete) || 0)}</td>


                <td class="coluna-center">

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
                      onClick={(e) => {
                        e.preventDefault();  // Impede o comportamento padrão do Link
                        window.open(`/readPedido/${pedido.id_pedido}`, "_blank");
                      }}
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
