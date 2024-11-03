import React, { useEffect, useState } from "react";
import axios from "axios";
import '../style.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Modal, Alert } from 'react-bootstrap';
import HelpCategoria from "../components/modalHelpCategoria"; // Importando o HelpCategoria
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
  const [isHelpCategoriaOpen, setIsHelpCategoriaOpen] = useState(false); // Estado para o modal de ajuda


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
      console.error("Erro ao tentar deletar a categoria:", err);
    }
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
      <div className=" d-flex flex-row-reverse">
        <button className="btn" onClick={() => setIsHelpCategoriaOpen(true)}>
          <HelpOutlineIcon />
        </button>
      </div>
      {/* Modal de ajuda */}
      <HelpCategoria
        isOpen={isHelpCategoriaOpen}
        onRequestClose={() => setIsHelpCategoriaOpen(false)}
      />
      <Button variant="primary" onClick={() => setShowAddModal(true)}>Nova Categoria</Button>

      {/* Modal para Adicionar Categoria */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Nova Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={newCategoria}
            onChange={(e) => setNewCategoria(e.target.value)}
            placeholder="Nome da Categoria"
            className="form-control"
          />
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Fechar</Button>
          <Button variant="primary" onClick={handleAdd}>Adicionar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para Atualizar Categoria */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Atualizar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={currentCategoria.nome}
            onChange={(e) => setCurrentCategoria({ ...currentCategoria, nome: e.target.value })}
            placeholder="Nome da Categoria"
            className="form-control"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Fechar</Button>
          <Button variant="primary" onClick={handleUpdate}>Atualizar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para Deletar Categoria */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza que deseja excluir esta categoria?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Não</Button>
          <Button variant="danger" onClick={handleDelete}>Sim</Button>
        </Modal.Footer>
      </Modal>

      {/* Mensagem de Sucesso */}
      {showSuccessModal && (
        <Alert variant="success" className="mt-3">{successMessage}</Alert>
      )}

      {/* Tabela */}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categoria.map((cat) => (
            <tr key={cat.id_categoria}>
              <td>{cat.id_categoria}</td>
              <td>{cat.nome}</td>
              <td>
                <Button variant="warning" onClick={() => {
                  setCurrentCategoria(cat);
                  setShowUpdateModal(true);
                }} >
                  <EditIcon />
                </Button>
                <Button variant="danger" onClick={() => {
                  setCategoriaIdToDelete(cat.id_categoria);
                  setShowDeleteModal(true);
                }} >
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categoria;
