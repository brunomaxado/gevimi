import React, { useEffect, useState } from "react";
import axios from "axios";
import '../style.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";

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

  useEffect(() => {
    const fetchAllCategorias = async () => {
      try {
        const res = await axios.get("http://localhost:8800/categoria");
        setCategoria(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCategorias();
  }, []);
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleDelete = async () => {
    try {
      if (categoriaIdToDelete !== null) {
        await axios.delete(`http://localhost:8800/categoria/${categoriaIdToDelete}`);
        setCategoria(categoria.filter(c => c.id_categoria !== categoriaIdToDelete));
        setShowDeleteModal(false);
        setCategoriaIdToDelete(null);
        showSuccess("Categoria excluída com sucesso!");
        setDeleteErrorMessage("");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setDeleteErrorMessage(err.response.data.message);
      } else {
        setDeleteErrorMessage("Erro ao tentar deletar a categoria.");
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
      setErrorMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      if (currentCategoria.nome) {
        await axios.put(`http://localhost:8800/categoria/${currentCategoria.id}`, { nome: currentCategoria.nome });
        setCurrentCategoria({ id: "", nome: "" });
        setShowUpdateModal(false);
        const res = await axios.get("http://localhost:8800/categoria");
        setCategoria(res.data);
        showSuccess("Categoria atualizada com sucesso!");
      }
    } catch (err) {
      console.log(err);
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Resete para a página 1 ao fazer uma nova busca
    setCurrentPage(1);
};

const filteredCategorias = categoria.filter(c => {
    return c.nome.toLowerCase().includes(searchTerm.toLowerCase());
});

// Paginação
const indexOfLastCategoria = currentPage * itemsPerPage;
const indexOfFirstCategoria = indexOfLastCategoria - itemsPerPage;
const currentCategorias = filteredCategorias.slice(indexOfFirstCategoria, indexOfLastCategoria);
const totalPages = Math.ceil(filteredCategorias.length / itemsPerPage);

// Atualize a lógica de navegação para ir para a página correta ao pesquisar
const paginateNext = () => {
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentPage === totalPages && totalPages > 1) {
        setCurrentPage(totalPages - 1); // Retorna para a página anterior se estiver na última
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
            onClick={() => {
              setSearchTerm("");
             
            }}
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
                        onClick={() => openDeleteModal(categoria.id_categoria)}
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


        {showDeleteModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Confirmar Exclusão</h2>
              <p>Tem certeza que deseja excluir a categoria?</p>
              <button className="modal-button" onClick={handleDelete}>Sim</button>
              <button className="modal-button" onClick={() => setShowDeleteModal(false)}>Não</button>
              {deleteErrorMessage && <p className="error-message">{deleteErrorMessage}</p>}
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

        {showAddModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Adicionar Categoria</h2>
              <input
                type="text"
                value={newCategoria}
                onChange={(e) => setNewCategoria(e.target.value)}
                placeholder="Nome da Categoria"
              />
              <button className="modal-button" onClick={handleAdd}>Adicionar</button>
              <button className="modal-button" onClick={() => setShowAddModal(false)}>Cancelar</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          </div>
        )}

        {showUpdateModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Atualizar Categoria</h2>
              <input
                type="text"
                value={currentCategoria.nome}
                onChange={(e) => setCurrentCategoria({ ...currentCategoria, nome: e.target.value })}
                placeholder="Nome da Categoria"
              />
              <button className="modal-button" onClick={handleUpdate}>Atualizar</button>
              <button className="modal-button" onClick={() => setShowUpdateModal(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categoria;
