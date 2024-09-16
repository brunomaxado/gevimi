import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../style.css'; // Certifique-se de importar o arquivo CSS

const ReadCliente = () => {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Novo estado para o modal de sucesso
  const [successMessage, setSuccessMessage] = useState(""); // Estado para a mensagem de sucesso
  const [searchTerm, setSearchTerm] = useState(""); // Estado para a pesquisa
  const [isSorted, setIsSorted] = useState(false); // Estado para ordenação
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
  const clientesPerPage = 10; // Número de clientes exibidos por página
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
      setClientes(clientes.filter(cliente => cliente.id_cliente !== selectedClienteId)); // Atualiza a lista de clientes sem recarregar a página
      setShowModal(false); // Fecha o modal de confirmação
      setSuccessMessage("Cliente deletado com sucesso!"); // Define a mensagem de sucesso
      setShowSuccessModal(true); // Exibe o modal de sucesso
      setTimeout(() => {
        setShowSuccessModal(false); // Fecha o modal de sucesso após 3 segundos
      }, 3000);
    } catch (err) {
      console.log(err);
      setShowModal(false); // Fecha o modal de confirmação mesmo em caso de erro
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

  // Filtra os clientes baseado no termo de pesquisa em múltiplos campos
  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cpf.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.celular.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cep.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.bairro.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.rua.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.numero.toString().includes(searchTerm)
  );

  // Paginação: calcula os clientes para a página atual
  const indexOfLastCliente = currentPage * clientesPerPage;
  const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
  const currentClientes = filteredClientes.slice(indexOfFirstCliente, indexOfLastCliente);

  // Muda para a próxima página
  const paginateNext = () => {
    if (currentPage < Math.ceil(filteredClientes.length / clientesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Muda para a página anterior
  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="tabela">
      <h1>Clientes</h1>
      <p>
        <button onClick={handleSort}>Ordenar {isSorted ? "A-Z" : "Z-A"}</button>
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
            <th>Rua</th>
            <th>Número</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentClientes.map((cliente) => (
            <tr key={cliente.id_cliente}>
              <td>{cliente.id_cliente}</td> {/* Coluna de ID */}
              <td>{cliente.nome}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.celular}</td>
              <td>{cliente.cep}</td>
              <td>{cliente.cidade}</td>
              <td>{cliente.bairro}</td>
              <td>{cliente.rua}</td>
              <td>{cliente.numero}</td>
              <td>
                <button className="update" onClick={() => handleUpdateClick(cliente.id_cliente)}>Update</button>
                <button className="delete" onClick={() => handleDeleteClick(cliente.id_cliente)}>Delete</button>
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
        <span>Página {currentPage} de {Math.ceil(filteredClientes.length / clientesPerPage)}</span>
        <button onClick={paginateNext} disabled={currentPage === Math.ceil(filteredClientes.length / clientesPerPage)}>
          Próximo
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
