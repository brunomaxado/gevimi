import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../style.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

const ReadCliente = () => {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const clientesPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllClientes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/cliente");
        const sortedClientes = res.data.sort((a, b) =>
          a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }) // Ordena alfabeticamente
        );
        setClientes(sortedClientes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllClientes();
  }, []);


  const formatCPF = (cpf) => {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  };

  const formatCellular = (cellular) => {
    return cellular.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  };

  const formatCEP = (cep) => {
    return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  };

  const handleDeleteClick = (id) => {
    setSelectedClienteId(id);
    setShowModal(true);
    setErrorMessage(""); // Limpa a mensagem de erro quando o modal é fechado
  };
  const [errorMessage, setErrorMessage] = useState(""); // Estado para a mensagem de erro
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8800/cliente/${selectedClienteId}`);
      setClientes(clientes.filter(cliente => cliente.id_cliente !== selectedClienteId));
      setShowModal(false);
      setSuccessMessage("Cliente deletado com sucesso!");
      setShowSuccessModal(true);
      setErrorMessage(""); // Limpa a mensagem de erro em caso de sucesso
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        // Erro específico de referência em pedido
        setErrorMessage(err.response.data.message); // Define a mensagem retornada pela API
      } else {
        // Outro erro
        setErrorMessage("Erro ao deletar cliente. Tente novamente.");
      }

    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleUpdateClick = (id) => {
    navigate(`/editarCliente/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reseta a página para 1 ao realizar a busca
  };

  // Filtrando os clientes pelo termo de pesquisa
  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cpf.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.celular.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cep.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.bairro.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.logradouro.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.numero.toString().includes(searchTerm)
  ).sort((a, b) =>
    a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }) // Ordena alfabeticamente
  );

  // Paginação: calcula os clientes para a página atual
  const indexOfLastCliente = currentPage * clientesPerPage;
  const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
  const currentClientes = filteredClientes.slice(indexOfFirstCliente, indexOfLastCliente);

  // Total de páginas
  const totalPages = Math.ceil(filteredClientes.length / clientesPerPage);

  // Muda para a próxima página
  const paginateNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100); // Pequeno atraso para garantir que o DOM seja atualizado
    }
  };

  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <h1>Clientes</h1>
      <div className="tabela">
        <div className="filters-container-produto">
          <div className="search-box">
            <label><SearchIcon className="search-icon" />  Pesquisar:</label>
            <input
              type="text"
              placeholder="Pesquisar nome, CPF..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <button
            className="limpar-filtro"
            onClick={() => {
              setSearchTerm("");
              setCurrentPage(1); // Reseta a página para 1 ao limpar
            }}
          >
            Limpar Filtros
          </button>
          <button className="adicionar-usuario" onClick={() => navigate('/cliente')}>
            Novo Cliente
          </button>
        </div>

        <div className="tabela-produto">
          <table>
            <thead>
              <tr>
                <th className="coluna-nome">Nome</th>
                <th className="coluna-cpf">CPF</th>
                <th className="coluna-cpf">Celular</th>
                <th className="coluna-cep">CEP</th>
                <th className="coluna-endereco">Endereço</th>
                <th className="coluna-descricao">Observação</th>
                <th className="coluna-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentClientes.map((cliente) => (
                <tr key={cliente.id_cliente}>
                  <td className="coluna-nome">{cliente.nome}</td>
                  <td className="coluna-cpf">{formatCPF(cliente.cpf)}</td>
                  <td className="coluna-cpf">{formatCellular(cliente.celular)}</td>
                  <td className="coluna-cep">{formatCEP(cliente.cep)}</td>
                  <td className="coluna-endereco">{`${cliente.cidade}, ${cliente.bairro}, ${cliente.logradouro}, ${cliente.numero}`}</td>
                  <td className="coluna-descricao">{cliente.observacao}</td>
                  <td className="coluna-center">
                    <div className="action-icons">
                      <span
                        className="action-icon delete"
                        onClick={() => handleDeleteClick(cliente.id_cliente)}
                        title="Deletar"
                      >
                        <DeleteIcon />
                      </span>
                      <span
                        className="action-icon visualizar"
                        onClick={() => handleUpdateClick(cliente.id_cliente)}
                        title="Editar"
                      >
                        <EditIcon />
                      </span>
                      <Link
                        to={`/readCliente/${cliente.id_cliente}`}
                        title="Visualizar"
                        className="action-icon visualizar"
                        style={{ textDecoration: 'none' }}
                      >
                        <VisibilityIcon />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="pagination">
          <button onClick={paginatePrev} disabled={currentPage === 1}>
            <ion-icon name="caret-back-outline"></ion-icon>
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button onClick={paginateNext} disabled={currentPage === totalPages}>
            <ion-icon name="caret-forward-outline"></ion-icon>
          </button>
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
            <p>Tem certeza que deseja excluir o cliente?</p>

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


    </div>
  );
};

export default ReadCliente;
