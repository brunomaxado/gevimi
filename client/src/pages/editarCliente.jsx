import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import FormCliente from "../components/formCliente";

const EditarCliente = () => {
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const clienteId = location.pathname.split("/")[2];

  const fetchCliente = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/cliente/${clienteId}`);
      setCliente(response.data);
    } catch (err) {
      console.error("Erro ao buscar o cliente:", err);
      setError("Cliente não encontrado.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Move a página para o topo
    fetchCliente();
  }, [clienteId]);

  const handleSubmit = async (updatedCliente) => {
    try {
      await axios.put(`http://localhost:8800/cliente/${clienteId}`, updatedCliente);
      showSuccess("Cliente atualizado com sucesso");
    } catch (err) {
      console.error("Erro ao atualizar o cliente:", err);
      setError("Erro ao atualizar o cliente.");
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/readCliente");
    }, 1200);
  };

  return (
    <div>
      <h1>EDITAR CLIENTE</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Modal de sucesso */}
      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      <div>
        {/* Renderiza o formulário somente se os dados do cliente já foram carregados */}
        {cliente ? (
          <FormCliente onSubmit={handleSubmit} initialData={cliente} />
        ) : (
          <p>Carregando os dados do cliente...</p>
        )}
      </div>
    </div>
  );
};

export default EditarCliente;
