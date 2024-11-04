import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditarUsuario = () => {
  const [usuario, setUsuario] = useState({
    nome: "",
    login: "",
    administrador: "0",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const usuarioId = location.pathname.split("/")[2];

  const fetchUsuario = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/usuario/${usuarioId}`);
      const { nome, login, administrador } = response.data;
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nome, login, administrador } = usuario;

    if (!nome || !login) {
      setError("Os campos Nome e Login são obrigatórios.");
      return;
    }

    const payload = { nome, login, administrador: parseInt(administrador) };

    try {
      await axios.put(`http://localhost:8800/editarusuario/${usuarioId}`, payload);
      showSuccess("Usuário atualizado com sucesso.");
    } catch (err) {
      console.error("Erro ao atualizar o usuário:", err);
      setError("Erro ao atualizar o usuário.");
    }
  };

  const handlePasswordChange = async () => {
    if (!novaSenha) {
      setError("A senha não pode estar vazia.");
      return;
    }

    try {
      await axios.put(`http://localhost:8800/novosenha/${usuarioId}`, { senha: novaSenha });
      showSuccess("Senha atualizada com sucesso.");
      setShowPasswordModal(false);
      setNovaSenha("");
    } catch (err) {
      console.error("Erro ao atualizar a senha:", err);
      setError("Erro ao atualizar a senha.");
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setSuccessMessage(""); // Limpa a mensagem ao fechar o modal
  };

  return (
    <div>
      <h1>EDITAR USUÁRIO</h1>
      <div className="form-container-usuario">
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
            <label>Administrador:</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="administrador"
                  value="1"
                  checked={usuario.administrador === "1"}
                  onChange={handleChange}
                />
                Sim
              </label>
              <label className="radio-option">
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
          <button type="button" onClick={() => setShowPasswordModal(true)}>
            Nova Senha
          </button>
        </form>

        {showSuccessModal && (
          <div className="success-modal">
            <div className="success-modal-content">
              <span>{successMessage}</span>
              <button onClick={closeSuccessModal}>Fechar</button>
            </div>
          </div>
        )}

        {showPasswordModal && (
          <div className="password-modal">
            <div className="password-modal-content">
              <h2>Atualizar Senha</h2>
              <input
                type="password"
                placeholder="Nova Senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                required
              />
              <button onClick={handlePasswordChange}>Atualizar Senha</button>
              <button onClick={() => setShowPasswordModal(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditarUsuario;
