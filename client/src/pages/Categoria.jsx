import React, { useEffect, useState } from "react";
import axios from "axios";
import '../style.css'; // Certifique-se de importar o arquivo CSS

const Categoria = () => {
  const [categoria, setCategoria] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false); // Estado para controlar a visibilidade do modal de adição
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Estado para controlar a visibilidade do modal de atualização
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar a visibilidade do modal de exclusão
  const [newCategoria, setNewCategoria] = useState(""); // Estado para o nome da nova categoria
  const [currentCategoria, setCurrentCategoria] = useState({ id: "", nome: "" }); // Estado para a categoria que será atualizada
  const [categoriaIdToDelete, setCategoriaIdToDelete] = useState(null); // Estado para armazenar o ID da categoria a ser excluída
  
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para o modal de sucesso
  const [successMessage, setSuccessMessage] = useState(""); // Estado para a mensagem de sucesso
  const [errorMessage, setErrorMessage] = useState(""); // Estado para a mensagem de erro no formulário

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
      setNewCategoria(""); // Limpa o campo após a adição
      setShowAddModal(false); // Fecha o modal
      // Atualize a lista de categorias
      const res = await axios.get("http://localhost:8800/categoria");
      setCategoria(res.data);
      showSuccess("Categoria adicionada com sucesso!");
      setErrorMessage(""); // Limpa a mensagem de erro
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      if (currentCategoria.nome) {
        await axios.put(`http://localhost:8800/categoria/${currentCategoria.id}`, { nome: currentCategoria.nome });
        setCurrentCategoria({ id: "", nome: "" }); // Limpa os campos após a atualização
        setShowUpdateModal(false); // Fecha o modal
        // Atualize a lista de categorias
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

  // Função para mostrar o modal de sucesso
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000); // O modal fechará automaticamente após 3 segundos
  };

  return (
    <div className="tabela">
      <h1>GEVIMI</h1>
      <button className="categoriaAdd" onClick={() => setShowAddModal(true)}>Nova Categoria</button>
      
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
          <span
        className="close"
        onClick={() => {
          setShowAddModal(false);
          setErrorMessage(""); // Limpar a mensagem de erro ao fechar o modal
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
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibe a mensagem de erro */}
            <br /> <br />
            <button onClick={handleAdd}>Adicionar</button>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowUpdateModal(false)}>&times;</span>
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
            <span className="close" onClick={closeDeleteModal}>&times;</span>
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
                <button className="delete" onClick={() => openDeleteModal(categoria.id_categoria)}>Delete</button>
                <button className="update" onClick={() => openUpdateModal(categoria)}>
                  Update
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
