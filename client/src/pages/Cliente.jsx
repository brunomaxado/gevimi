import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormCliente from "../components/formCliente";
import HelpCliente from "../components/modalHelpCliente";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const CreateCliente = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isHelpClienteOpen, setIsHelpClienteOpen] = useState(false); // Estado para o modal de ajuda
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    
    <div>
      {/* Botão para abrir o modal de ajuda */}
      <div className=" d-flex flex-row-reverse">
        <button className="btn" onClick={() => setIsHelpClienteOpen(true)}>
          <HelpOutlineIcon />
        </button>
      </div>
      {/* Modal de ajuda */}
      <HelpCliente
        isOpen={isHelpClienteOpen}
        onRequestClose={() => setIsHelpClienteOpen(false)}
      />


      <h1>Cadastrar cliente</h1>

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
