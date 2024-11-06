import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../style.css'; // Certifique-se de importar o arquivo CSS
import VisibilityIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const ReadUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUsuarioId, setSelectedUsuarioId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usuariosPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsuarios = async () => {
      try {
        const res = await axios.get("http://localhost:8800/usuario");
        setUsuarios(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllUsuarios();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedUsuarioId(id);
    setShowModal(true);
    setErrorMessage(" ");
  };
  
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/usuario/${selectedUsuarioId}`);
      setUsuarios(usuarios.filter(usuario => usuario.id_usuario !== selectedUsuarioId));
      setShowModal(false);
      setSuccessMessage("Usuário deletado com sucesso!");
      setShowSuccessModal(true);
  
      // Fecha o modal de sucesso automaticamente após 3 segundos
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      
      // Captura a mensagem de erro enviada pelo backend ou define uma mensagem genérica
      const errorMessage = err.response?.data?.message || "Erro ao deletar o usuário.";
      setErrorMessage(errorMessage);
  
      // Mantém o modal aberto para exibir a mensagem de erro
      setShowModal(true);
    }
  };
  

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleUpdateClick = (id) => {
    navigate(`/editarUsuario/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reseta a página para 1 ao fazer uma nova pesquisa
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSort = () => {
    const sortedUsuarios = [...usuarios].sort((a, b) => {
      return isSorted
        ? a.nome.localeCompare(b.nome)
        : b.nome.localeCompare(a.nome);
    });
    setUsuarios(sortedUsuarios);
    setIsSorted(!isSorted);
  };

  // Filtra os usuários com base no termo de pesquisa
  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Aplica a paginação na lista filtrada
  const indexOfLastUsuario = currentPage * usuariosPerPage;
  const indexOfFirstUsuario = indexOfLastUsuario - usuariosPerPage;
  const currentUsuarios = filteredUsuarios.slice(indexOfFirstUsuario, indexOfLastUsuario);

  const totalPages = Math.ceil(filteredUsuarios.length / usuariosPerPage);

  const paginateNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const [errorMessage, setErrorMessage] = useState(""); // Estado para a mensagem de erro
  
  const handleClose = () => setShowModal(false);
  return (
    <div>
      <h1>Usuários</h1> 
      <div className="tabela">
        <div className="filters-container-produto">
          <div className="search-box">
            <label>
              <SearchIcon className="search-icon" />  Pesquisar:
            </label>
            <input
              type="text"
              placeholder="Pesquisar..."
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
          <button className="adicionar-usuario" onClick={() => navigate('/register')}>
            Novo Usuário
          </button>
        </div>
        <div className="tabela-produto">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Login</th>
                <th className="coluna-center">Administrador</th>
                <th className="coluna-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentUsuarios.map((usuario) => (
                <tr key={usuario.id_usuario}>
                  <td>{usuario.nome}</td>
                  <td>{usuario.login}</td>
                  <td className="coluna-center">{usuario.is_administrador ? 'Sim' : 'Não'}</td>
                  <td className="coluna-center">
                    <div className="action-icons">
                      <span
                        className="action-icon delete"
                        onClick={() => handleDeleteClick(usuario.id_usuario)}
                        title="Deletar"
                      >
                        <DeleteIcon />
                      </span>
                      <span
                        className="action-icon visualizar"
                        onClick={() => handleUpdateClick(usuario.id_usuario)}
                        title="Editar"
                      >
                        <VisibilityIcon />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {currentPage !== 1 && (
            <button onClick={paginatePrev}>
              <ion-icon name="caret-back-outline"></ion-icon>
            </button>
          )}
          <span>{currentPage} de {totalPages}</span>
          {currentPage !== totalPages && (
            <button onClick={paginateNext}>
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
      <p>Tem certeza que deseja excluir o usuário</p>
      
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

export default ReadUsuario;
