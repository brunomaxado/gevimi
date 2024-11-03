import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../style.css'; // Certifique-se de importar o arquivo CSS
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ReadCliente = () => {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const clientesPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllClientes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/cliente");
        setClientes(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllClientes();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedClienteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/cliente/${selectedClienteId}`);
      setClientes(clientes.filter(cliente => cliente.id_cliente !== selectedClienteId));
      setShowModal(false);
      setSuccessMessage("Cliente deletado com sucesso!");
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
    navigate(`/editarCliente/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    const sortedClientes = [...clientes].sort((a, b) => {
      return isSorted
        ? a.nome.localeCompare(b.nome)
        : b.nome.localeCompare(a.nome);
    });
    setClientes(sortedClientes);
    setIsSorted(!isSorted);
  };

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cpf.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.celular.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cep.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.bairro.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.logradouro.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.numero.toString().includes(searchTerm)
  );

  const indexOfLastCliente = currentPage * clientesPerPage;
  const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
  const currentClientes = filteredClientes.slice(indexOfFirstCliente, indexOfLastCliente);

  const paginateNext = () => {
    if (currentPage < Math.ceil(filteredClientes.length / clientesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="tabela">
      <h1>Clientes</h1>
      <p>
      <button onClick={() => navigate('/cliente')}>Novo Cliente</button>
      </p>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Procurar por nome, CPF, celular..."
        title="Digite um nome, CPF, celular, etc."
      />
      <table id="tabelaCliente">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Celular</th>
            <th>CEP</th>
            <th>Cidade</th>
            <th>Bairro</th>
            <th>Logradouro</th>
            <th>Número</th>
            <th>Observação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentClientes.map((cliente) => (
            <tr key={cliente.id_cliente}>
              <td>{cliente.id_cliente}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.celular}</td>
              <td>{cliente.cep}</td>
              <td>{cliente.cidade}</td>
              <td>{cliente.bairro}</td>
              <td>{cliente.logradouro}</td>
              <td>{cliente.numero}</td>
              <td>{cliente.observacao}</td>
              <td>
                <button className="update" onClick={() => handleUpdateClick(cliente.id_cliente)}>
                  <EditIcon />
                </button>
                <button className="delete" onClick={() => handleDeleteClick(cliente.id_cliente)}>
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="pagination">
        <button onClick={paginatePrev} disabled={currentPage === 1}>
          <ion-icon name="caret-back-outline"></ion-icon>
        </button>
        <span>Página {currentPage} de {Math.ceil(filteredClientes.length / clientesPerPage)}</span>
        <button onClick={paginateNext} disabled={currentPage === Math.ceil(filteredClientes.length / clientesPerPage)}>
          <ion-icon name="caret-forward-outline"></ion-icon>
        </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir o cliente?</p>
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

export default ReadCliente;
