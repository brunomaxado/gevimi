import React, { useState, useEffect, useContext, useRef } from "react";
import { useModified } from "../context/ModifiedContext";
import { useNavigate } from "react-router-dom";

const FormUsuario = ({ handleChange, handleSubmit, inputs, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { isModified, setIsModified } = useModified(); // Acessando o contexto
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(-1); // Navega para a página anterior
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  console.log("isModified:", isModified);

  useEffect(() => {
    // Reseta isModified ao desmontar o componente
    return () => {
      setIsModified(false);
    };
  }, [setIsModified]);

  // Função personalizada para marcar o formulário como modificado e chamar handleChange
  const handleCustomChange = (e) => {
    setIsModified(true); // Marca o formulário como modificado
    handleChange(e);
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className="form-container">
      {/* Exibe erro se houver */}

      <div className="form-row">
        <div className="form-group">
          <label>
            Nome: <span className="asterisco">*</span>
          </label>
          <input
            required
            type="text"
            placeholder="nome"
            name="nome"
            value={inputs.nome}
            onChange={handleCustomChange} // Alterado para handleCustomChange
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>
            Login: <span className="asterisco">*</span>
          </label>
          <input
            required
            type="text"
            placeholder="login"
            name="login"
            value={inputs.login}
            onChange={handleCustomChange} // Alterado para handleCustomChange
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group senha-container" style={{ position: "relative" }}>
          <label>
            Senha: <span className="asterisco">*</span>
          </label>
          <input
            required
            type={showPassword ? "text" : "password"}
            placeholder="senha"
            name="senha"
            value={inputs.senha}
            onChange={handleCustomChange} // Alterado para handleCustomChange
            className="senha-input"
            style={{ width: "100%", paddingRight: "50px" }} // Espaço extra para o botão
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              top: "50%", // Centraliza verticalmente
              right: "-14%", // Cola o botão na borda direita
              transform: "translateY(-50%)", // Alinha verticalmente ao centro do input
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>
            Administrador: <span className="asterisco">*</span>
          </label>
          <div className="radio-group" style={{ display: "flex", gap: "10px" }}>
            <label>
              <input
                type="radio"
                name="administrador"
                value="1"
                checked={inputs.administrador === "1"}
                onChange={handleCustomChange} // Alterado para handleCustomChange
              />
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="administrador"
                value="0"
                checked={inputs.administrador === "0"}
                onChange={handleCustomChange} // Alterado para handleCustomChange
              />
              Não
            </label>
          </div>
        </div>
      </div>

      <p>
        <span className="asterisco">* </span>Os campos marcados com asterisco
        vermelho são obrigatórios.
      </p>
      <button className="voltar" onClick={handleClick}>
        Voltar
      </button>
      <button type="submit">Confirmar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
    </form>
    
    </div>
  );
};

export default FormUsuario;
