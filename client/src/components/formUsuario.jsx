import React, { useState } from "react";

const FormUsuario = ({ handleChange, handleSubmit, inputs, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* Exibe erro se houver */}
      {error && <p style={{ color: "red" }}>{error}</p>}

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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            className="senha-input"
            style={{ width: "100%", paddingRight: "50px" }} // Espaço extra para o botão
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              top: "50%", // Centraliza verticalmente
              right: "0", // Cola o botão na borda direita
              transform: "translateY(-50%)", // Alinha verticalmente ao centro do input
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              padding: "0 10px", // Dá um pouco de espaço interno para o botão
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
                onChange={handleChange}
              />
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="administrador"
                value="0"
                checked={inputs.administrador === "0"}
                onChange={handleChange}
              />
              Não
            </label>
          </div>
        </div>
      </div>
      <p>
        <span className="asterisco">*</span>Os campos marcados com asterisco
        vermelho são obrigatórios.
      </p>

      <button type="submit">Confirmar</button>
    </form>
  );
};

export default FormUsuario;
