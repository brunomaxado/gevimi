import React from "react";

const FormUsuario = ({ handleChange, handleSubmit, inputs, err }) => {
  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* Exibe erro se houver */}
      {err && <p className="error-message">{err}</p>}

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
          <label>Administrador:</label>
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

      <button type="submit">SALVAR</button>
    </form>
  );
};

export default FormUsuario;
