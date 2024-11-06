import React, { useEffect, useState } from "react";
import axios from "axios";
import '../style.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { Button, Modal, Alert } from 'react-bootstrap';
import ModalHelpCategoria from "../components/modalHelpCategoria"; // Importando o HelpCategoria
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Categoria = () => {
  const [categoria, setCategoria] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newCategoria, setNewCategoria] = useState("");
  const [currentCategoria, setCurrentCategoria] = useState({ id: "", nome: "" });
  const [categoriaIdToDelete, setCategoriaIdToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [isHelpCategoriaOpen, setIsHelpCategoriaOpen] = useState(false); // Estado para o modal de ajuda

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleClose = () => setShowModal(false);
  const [showModal, setShowModal] = useState(false);
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
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = async () => {
    try {
      if (selectedCategoriaId !== null) {
        await axios.delete(`http://localhost:8800/categoria/${selectedCategoriaId}`);
        setCategoria(categoria.filter(c => c.id_categoria !== selectedCategoriaId));
        setShowDeleteModal(false);
        setCategoriaIdToDelete(null);
        showSuccess("Categoria excluída com sucesso!");
        setDeleteErrorMessage("");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Erro ao tentar deletar a categoria.");
      }
    }
  };

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
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8800/categoria/${currentCategoria.id}`, { nome: currentCategoria.nome });
      setCurrentCategoria({ id: "", nome: "" });
      setShowUpdateModal(false);
      const res = await axios.get("http://localhost:8800/categoria");
      setCategoria(res.data);
      showSuccess("Categoria atualizada com sucesso!");
    } catch (err) {
      console.error(err);
    }
  };

  const openUpdateModal = (categoria) => {
    setCurrentCategoria({ id: categoria.id_categoria, nome: categoria.nome });
    setShowUpdateModal(true);
  };

  const openDeleteModal = (id) => {
    setCategoriaIdToDelete(id);
    setShowDeleteModal(true);
    setDeleteErrorMessage("");
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 1200);
  };
  const [selectedCategoriaId, setSelectedCategoriaId] = useState(null);
  const handleDeleteClick = (id) => {
    setSelectedCategoriaId(id);
    setShowModal(true);
    setErrorMessage(" ");
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Resete para a página 1 ao fazer uma nova busca
  };

  const filteredCategorias = categoria.filter(c => {
    return c.nome.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Paginação
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

  return (
    <div>
          <div className="d-flex flex-row-reverse">
        <Button variant="link" onClick={() => setIsHelpCategoriaOpen(true)}>
          <HelpOutlineIcon />
        </Button>
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
                        onClick={() => handleDeleteClick(categoria.id_categoria)}
                        title="Deletar"
                      >
                        <DeleteIcon />
                      </span>
                      <span
                        className="action-icon edit"
                        onClick={() => openUpdateModal(categoria)}
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

        {/* Modal de sucesso */}
        {showSuccessModal && (
          <div className="success-modal">
            <div className="success-modal-content">
              <Alert variant="success" onClose={() => setShowSuccessModal(false)} dismissible>
                {successMessage}
              </Alert>
            </div>
          </div>
        )}
      </div>

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

export default Categoria;
