import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormCliente from "../components/formCliente";

const CreateCliente = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/readCliente");
    }, 1200);
  };

  const handleSubmit = async (cliente) => {
    try {
      await axios.post("http://localhost:8800/cliente", cliente);
      showSuccess("Cliente adicionado com sucesso");
    } catch (err) {
      console.error("Erro ao adicionar o cliente:", err);
    }
  };

  return (
    <div>
      <h1>NOVO CLIENTE</h1>
     
      <FormCliente onSubmit={handleSubmit} />

      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <span>{successMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCliente;
