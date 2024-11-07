import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormCliente from "../components/formCliente";
import HelpCliente from "../components/modalHelpCliente";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const CreateCliente = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(""); // Estado para mensagens de erro
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
      // Envia os dados para o backend para adicionar o cliente
      await axios.post("http://localhost:8800/cliente", cliente);
      showSuccess("Cliente adicionado com sucesso!");
    } catch (err) {
      console.error("Erro ao adicionar o cliente:", err);
  
      // Verifica se há uma resposta de erro do servidor
      if (err.response && err.response.data && err.response.data.message) {
        // Exibe a mensagem de erro retornada pelo backend
        setError(err.response.data.message);
      } else {
        // Caso não haja mensagem de erro específica, exibe uma mensagem genérica
        setError("Erro ao adicionar o cliente. Tente novamente mais tarde.");
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div>
        <HelpCliente
          isOpen={isHelpClienteOpen}
          onRequestClose={() => setIsHelpClienteOpen(false)}
        />
      </div>

      <h1>Cadastrar cliente</h1>

      {/* Passando o erro para o formulário, para ser exibido lá */}
      <FormCliente onSubmit={handleSubmit} error={error} />

      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {/* Exibindo a mensagem de erro, se houver */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CreateCliente;
