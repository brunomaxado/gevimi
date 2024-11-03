// Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FormUsuario from "../components/formUsuario"; // Importando o novo formulário


const Register = () => {
  const [inputs, setInputs] = useState({
    nome: "",
    login: "",
    senha: "",
    administrador: "0",// Valor inicial para isAdmin (pode ser "false" ou vazio)
  });
  const [err, setError] = useState(null);

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

  return (
    <div className="auth, login">
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
