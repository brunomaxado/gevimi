import React, { useEffect, useState } from "react";
import axios from "axios";
import '../style.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import ModalHelpCategoria from "../components/modalHelpCategoria";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Categoria = () => {
  const [categoria, setCategoria] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCategoria, setNewCategoria] = useState("");
  const [editCategoriaId, setEditCategoriaId] = useState(null);
  const [editCategoriaName, setEditCategoriaName] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [isHelpCategoriaOpen, setIsHelpCategoriaOpen] = useState(false);
  const [categoriaIdToDelete, setCategoriaIdToDelete] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchAllCategorias = async () => {
      try {
        const res = await axios.get("http://localhost:8800/categoria");
        setCategoria(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllCategorias();
  }, []);

  const handleAdd = async () => {
    if (!newCategoria) {
      setErrorMessage("Campo nome deve estar preenchido");
      return;
    }
    try {
      await axios.post("http://localhost:8800/categoria", { nome: newCategoria });
      setNewCategoria("");
      setShowAddModal(false);
      const res = await axios.get("http://localhost:8800/categoria");
      setCategoria(res.data);
      showSuccess("Categoria adicionada com sucesso!");
    } catch (err) {
      console.error(err);
      // Verifica se o erro contém uma resposta do backend e exibe a mensagem de erro
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message); // Exibe o erro retornado pelo backend
      } else {
        setErrorMessage("Erro ao tentar adicionar a categoria."); // Mensagem genérica
      }
    }
  };
  
  const handleEdit = async () => {
    if (!editCategoriaName) {
      setErrorMessage("Campo nome deve estar preenchido");
      return;
    }
    try {
      await axios.put(`http://localhost:8800/categoria/${editCategoriaId}`, { nome: editCategoriaName });
      setEditCategoriaId(null);
      setEditCategoriaName("");
      setShowEditModal(false);
      const res = await axios.get("http://localhost:8800/categoria");
      setCategoria(res.data);
      showSuccess("Categoria editada com sucesso!");
    } catch (err) {
      console.error(err);
      // Verifica se o erro contém uma resposta do backend e exibe a mensagem de erro
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message); // Exibe o erro retornado pelo backend
      } else {
        setErrorMessage("Erro ao tentar editar a categoria."); // Mensagem genérica
      }
    }
  };
  
  
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/categoria/${categoriaIdToDelete}`);
      setCategoria(categoria.filter(c => c.id_categoria !== categoriaIdToDelete));
      setShowDeleteModal(false);
      showSuccess("Categoria excluída com sucesso!");
    } catch (err) {
      console.error(err);
      // Verifica se o erro contém uma resposta do backend
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message); // Exibe o erro enviado pelo backend
      } else {
        setErrorMessage("Erro ao tentar deletar a categoria."); // Mensagem genérica em caso de erro desconhecido
      }
    }
  };
  

  const [showModal, setShowModal] = useState(false);
  const [selectedPedidoId, setSelectedPedidoId] = useState(null);
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 1200);
  };
  const handleDeleteClick = (id) => {
    setSelectedPedidoId(id);
    setShowModal(true);
    setErrorMessage(" ");
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredCategorias = categoria.filter(c => {
    return c.nome.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastCategoria = currentPage * itemsPerPage;
  const indexOfFirstCategoria = indexOfLastCategoria - itemsPerPage;
  const currentCategorias = filteredCategorias.slice(indexOfFirstCategoria, indexOfLastCategoria);
  const totalPages = Math.ceil(filteredCategorias.length / itemsPerPage);

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div>
      <div className="d-flex flex-row-reverse">
        <button onClick={() => setIsHelpCategoriaOpen(true)}>
          <HelpOutlineIcon />
        </button>
      </div>
      
      <ModalHelpCategoria
        isOpen={isHelpCategoriaOpen}
        onRequestClose={() => setIsHelpCategoriaOpen(false)}
      />
      <h1>Categorias:</h1>
      <div className="tabela">
        <div className="filters-container-categoria">
          <div className="search-box">
            <label><SearchIcon className="search-icon" /> Pesquisar:</label>
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
            onClick={() => setSearchTerm("")}
          >
            Limpar Filtros
          </button>
          <button className="adicionar-categoria" onClick={() => setShowAddModal(true)}>
            Nova Categoria
          </button>
        </div>

        <div className="tabela-categoria">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th className="coluna-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentCategorias.map((categoria) => (
                <tr key={categoria.id_categoria}>
                  <td>{categoria.nome}</td>
                  <td className="coluna-center">
                    <div className="action-icons">
                    <span
                        className="action-icon delete"
                        onClick={() => {
                          
                          setCategoriaIdToDelete(categoria.id_categoria);
                          setShowDeleteModal(true);
                          setErrorMessage(" ");
                        }}
                        title="Deletar"
                      >
                        <DeleteIcon />
                      </span>
                      <span
                        className="action-icon edit"
                        onClick={() => {
                          setErrorMessage(" ");
                          setEditCategoriaId(categoria.id_categoria);
                          setEditCategoriaName(categoria.nome);
                          setShowEditModal(true);
                        }}
                        title="Editar"
                      >
                        <EditIcon />
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
          {currentPage < totalPages && filteredCategorias.length > 0 && (
            <button onClick={paginateNext}>
              <ion-icon name="caret-forward-outline"></ion-icon>
            </button>
          )}
        </div>

      </div>
      
      {/* Modal de adicionar categoria */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowAddModal(false)}>X</button>
            <h2>Nova Categoria</h2>
            <label>Nome: </label>
            <input
              type="text"
              placeholder="Nome da Categoria"
              value={newCategoria}
              onChange={(e) => setNewCategoria(e.target.value)}
              className="form-control"
              required
            />
            {errorMessage && <div className="error-message show">{errorMessage}</div>}
            <div className="modal-actions">
              <button className="modal-button" onClick={() => setShowAddModal(false)}>Cancelar</button>
              <button className="modal-button" onClick={handleAdd}>Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de editar categoria */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowEditModal(false)}>X</button>
            <h2>Editar Categoria</h2>
            <label>Nome: </label>
            <input
              type="text"
              value={editCategoriaName}
              onChange={(e) => setEditCategoriaName(e.target.value)}
              className="form-control"
            />
            {errorMessage && <div className="error-message show">{errorMessage}</div>}
            <div className="modal-actions">
              <button className="modal-button" onClick={() => setShowEditModal(false)}>Cancelar</button>
              <button className="modal-button" onClick={handleEdit}>Salvar</button>
            </div>
          </div>
        </div>
      )}
  {/* Modal de confirmação de exclusão */}
  {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowDeleteModal(false)}>X</button>
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir esta categoria?</p>
            {errorMessage && <div className="error-message show">{errorMessage}</div>}
            <div className="modal-actions">
              <button className="modal-button" onClick={handleDelete}>Sim</button>
              <button className="modal-button" onClick={() => setShowDeleteModal(false)}>Não</button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de sucesso */}
      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <label>{successMessage}</label>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default Categoria;
