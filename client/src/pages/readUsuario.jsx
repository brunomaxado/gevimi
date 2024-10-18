import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../style.css'; // Certifique-se de importar o arquivo CSS

const ReadUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUsuarioId, setSelectedUsuarioId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usuariosPerPage = 5;
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
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/usuario/${selectedUsuarioId}`);
      setUsuarios(usuarios.filter(usuario => usuario.id_usuario !== selectedUsuarioId));
      setShowModal(false);
      setSuccessMessage("Usuário deletado com sucesso!");
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setShowModal(false);
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
  };

  const handleSort = () => {
    const sortedUsuarios = [...usuarios].sort((a, b) => {
      return isSorted
        ? a.nome.localeCompare(b.nome)
        : b.nome.localeCompare(a.nome);
    });
    setUsuarios(sortedUsuarios);
    setIsSorted(!isSorted);
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUsuario = currentPage * usuariosPerPage;
  const indexOfFirstUsuario = indexOfLastUsuario - usuariosPerPage;
  const currentUsuarios = filteredUsuarios.slice(indexOfFirstUsuario, indexOfLastUsuario);

  const paginateNext = () => {
    if (currentPage < Math.ceil(filteredUsuarios.length / usuariosPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="tabela">
      <h1>Usuários</h1>
      <p>
        <button onClick={handleSort}>Ordenar {isSorted ? "A-Z" : "Z-A"}</button>
      </p>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Procurar por nome, login..."
        title="Digite um nome ou login"
      />
      <table id="tabelaUsuario">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Login</th>
            <th>Administrador</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentUsuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.id_usuario}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.login}</td>
              <td>{usuario.administrador === 1 ? "Sim" : "Não"}</td>
              <td>
                <button className="update" onClick={() => handleUpdateClick(usuario.id_usuario)}>Atualizar</button>
                <button className="delete" onClick={() => handleDeleteClick(usuario.id_usuario)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="pagination">
        <button onClick={paginatePrev} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {Math.ceil(filteredUsuarios.length / usuariosPerPage)}</span>
        <button onClick={paginateNext} disabled={currentPage === Math.ceil(filteredUsuarios.length / usuariosPerPage)}>
          Próximo
        </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir o usuário?</p>
            <button className="modal-button" onClick={handleDelete}>Sim</button>
            <button className="modal-button" onClick={handleCancel}>Não</button>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <h2>{successMessage}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadUsuario;
