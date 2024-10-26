import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditarUsuario = () => {
  const [usuario, setUsuario] = useState({
    nome: "",
    login: "",
    senha: "",
    administrador: "0", // Inicializa como 'Não'
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const usuarioId = location.pathname.split("/")[2]; // Extrai o ID da URL

  // Função para buscar os dados do usuário
  const fetchUsuario = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/usuario/${usuarioId}`);
      const { nome, login, administrador } = response.data; // Inclui 'administrador'
      setUsuario((prev) => ({ ...prev, nome, login, administrador: String(administrador) }));
    } catch (err) {
      console.error("Erro ao buscar o usuário:", err);
      setError("Usuário não encontrado.");
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, [usuarioId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nome, login, senha, administrador } = usuario;

    if (!nome || !login) {
      setError("Os campos Nome e Login são obrigatórios.");
      return;
    }

    const payload = { nome, login, administrador: parseInt(administrador) };
    if (senha) payload.senha = senha;

    try {
      await axios.put(`http://localhost:8800/usuario/${usuarioId}`, payload);
      showSuccess("Usuário atualizado com sucesso.");
    } catch (err) {
      console.error("Erro ao atualizar o usuário:", err);
      setError("Erro ao atualizar o usuário.");
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/viewUsuario");
    }, 1500);
  };

  return (
    <div className="form-container">
      <h1>EDITAR USUÁRIO</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={usuario.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Login:</label>
          <input
            type="text"
            name="login"
            value={usuario.login}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Senha (Deixe em branco para não alterar):</label>
          <input
            type="password"
            name="senha"
            value={usuario.senha}
            onChange={handleChange}
            placeholder="Nova senha"
          />
        </div>

        <div className="form-group">
          <label>Administrador:</label>
          <div>
            <label>
              <input
                type="radio"
                name="administrador"
                value="1"
                checked={usuario.administrador === "1"}
                onChange={handleChange}
              />
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="administrador"
                value="0"
                checked={usuario.administrador === "0"}
                onChange={handleChange}
              />
              Não
            </label>
          </div>
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>

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

export default EditarUsuario;
