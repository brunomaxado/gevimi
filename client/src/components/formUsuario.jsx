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
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="isAdmin"
                value="true"
                checked={inputs.isAdmin === "true"}
                onChange={handleChange}
              />
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="isAdmin"
                value="false"
                checked={inputs.isAdmin === "false"}
                onChange={handleChange}
              />
              Não
            </label>
          </div>
        </div>
      </div>

      <button type="submit">Registrar</button>
    </form>
  );
};

export default FormUsuario;
