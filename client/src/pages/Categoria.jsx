import React, { useEffect, useState } from "react";
import axios from "axios";
import '../style.css';

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

  const handleDelete = async () => {
    try {
      if (categoriaIdToDelete !== null) {
        await axios.delete(`http://localhost:8800/categoria/${categoriaIdToDelete}`);
        setCategoria(categoria.filter(c => c.id_categoria !== categoriaIdToDelete));
        setShowDeleteModal(false);
        setCategoriaIdToDelete(null);
        showSuccess("Categoria excluída com sucesso!");
      }
    } catch (err) {
      console.log(err);
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
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCategoriaIdToDelete(null);
  };


  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  return (
    <div className="tabela">
      <h1>Categorias</h1>
      <button className="categoriaAdd" onClick={() => setShowAddModal(true)}>Nova Categoria</button>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close-modal"
              onClick={() => {
                setShowAddModal(false);
                setErrorMessage("");
              }}
            >
              &times;
            </span>
            <h2>Adicionar Nova Categoria</h2>
            <input
              type="text"
              value={newCategoria}
              onChange={(e) => setNewCategoria(e.target.value)}
              placeholder=" Nome da Categoria"
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <br /> <br />
            <button onClick={handleAdd}>Adicionar</button>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-modal" onClick={() => setShowUpdateModal(false)}>&times;</span>
            <h2>Atualizar Categoria</h2>
            <input
              type="text"
              value={currentCategoria.nome}
              onChange={(e) => setCurrentCategoria({ ...currentCategoria, nome: e.target.value })}
              placeholder=" Nome da Categoria"
            />
            <br /> <br />
            <button className="modal-button" onClick={handleUpdate}>Atualizar</button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-modal" onClick={closeDeleteModal}>&times;</span>
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir esta categoria?</p>
            <button className="modal-button" onClick={handleDelete}>Sim</button>
            <button className="modal-button" onClick={closeDeleteModal}>Não</button>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      <br /><br /><br /><br />
      
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categoria.map((categoria) => (
            <tr key={categoria.id_categoria}>
              <td>{categoria.id_categoria}</td>
              <td>{categoria.nome}</td>
              <td>
                <button className="update" onClick={() => openUpdateModal(categoria)}>
                  Atualizar
                </button>
                <button className="delete" onClick={() => openDeleteModal(categoria.id_categoria)}>
                  Excluir
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categoria;
