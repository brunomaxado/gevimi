import React from "react";

const FormUsuario = ({ handleChange, handleSubmit, inputs, error }) => {
  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* Exibe erro se houver */}
    
      <div className="form-row">
        <div className="form-group">
          <label> Nome: <span className="asterisco">*</span> </label>
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
          <label> Login: <span className="asterisco">*</span> </label>
          <input
            required
            type="text"
            placeholder="entrar"
            name="login"
            value={inputs.login}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label> Senha: <span className="asterisco">*</span> </label>
          <input
            required
            type="password"
            placeholder="senha"
            name="senha"
            value={inputs.senha}
            onChange={handleChange}
            className="senha-input"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label> Administrador: <span className="asterisco">*</span> </label>
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
      <p> <span className="asterisco">*</span>Os campos marcados com asterisco vermelho são obrigatórios.</p>

      <button type="submit">Confirmar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default FormUsuario;

