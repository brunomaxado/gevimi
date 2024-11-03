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
  const [err, setError] = useState(null);
  const [isHelpUsuarioOpen, setIsHelpUsuarioOpen] = useState(false); // Estado para o modal de ajuda

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  };
 console.log(inputs);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/register", inputs);
      navigate("/readProduto");
    } catch (err) {
      setError(err.response.data);
    }
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
        err={err}
      />
    </div>
    </div>
  );
};

export default Register;
