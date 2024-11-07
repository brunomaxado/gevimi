// Register.jsx
import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FormUsuario from "../components/formUsuario"; // Importando o novo formulário
import HelpUsuario from "../components/modalHelpUsuario";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Register = () => {
  const [inputs, setInputs] = useState({
    nome: "",
    login: "",
    senha: "",
    administrador: "0",// Valor inicial para isAdmin (pode ser "false" ou vazio)
  });
  const [isHelpUsuarioOpen, setIsHelpUsuarioOpen] = useState(false); // Estado para o modal de ajuda
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  };
 console.log(inputs);
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://localhost:8800/register", inputs);
    
    showSuccess("Usuário adicionado com sucesso!");
  } catch (err) {
    console.log(err); // Verifique a resposta completa do erro no console
    const errorMessage = err.response.data.message || "Erro desconhecido. Tente novamente mais tarde.";
    setError(errorMessage); // Armazena a mensagem de erro no estado
  }
};

const showSuccess = (message) => {
  setSuccessMessage(message);
  setShowSuccessModal(true);
  setTimeout(() => {
    setShowSuccessModal(false);
    navigate("/readUsuario");
  }, 1200);
};
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="auth, login">
 {/* Botão para abrir o modal de ajuda */}
 <div className=" d-flex flex-row-reverse">
        <button className="btn" onClick={() => setIsHelpUsuarioOpen(true)}>
          <HelpOutlineIcon />
        </button>
      </div>
      {/* Modal de ajuda */}
      <HelpUsuario
        isOpen={isHelpUsuarioOpen}
        onRequestClose={() => setIsHelpUsuarioOpen(false)}
      />
      <h1>NOVO USUÁRIO</h1>

      <div className="form"> 
      <FormUsuario
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        inputs={inputs}
        error={error}
      />
    </div>
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

export default Register;
