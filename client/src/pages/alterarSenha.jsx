import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useModified } from "../context/ModifiedContext";
const AlterarSenha = () => {
  const [senhaData, setSenhaData] = useState({
    id_usuario: null,
    nome: "",
    senhaAntiga: "",
    senhaNova: "",
  });
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { isModified, setIsModified } = useModified(); // Acessando o contexto
  const usuarioId = currentUser?.id_usuario;
  console.log("isModified:", isModified);
  useEffect(() => {
  // Reseta isModified ao desmontar o componente
  return () => {
    setIsModified(false);
  };
}, [setIsModified]);
  useEffect(() => {
    setSenhaData((prev) => ({ ...prev, id_usuario: usuarioId }));
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/usuario/${usuarioId}`);
        setSenhaData((prev) => ({ ...prev, nome: response.data.nome }));
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        setError("Usuário não encontrado.");
      }
    };
    if (usuarioId) {
      fetchUsuario();
    }
  }, [usuarioId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSenhaData((prev) => ({ ...prev, [name]: value }));
    setIsModified(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { senhaAntiga, senhaNova } = senhaData;

    if (!senhaAntiga || !senhaNova) {
      setError("Todos os campos de senha devem ser preenchidos.");
      return;
    }

    if (senhaAntiga === senhaNova) {
      setError("A nova senha deve ser diferente da antiga.");
      return;
    }

    try {
      await axios.put(`http://localhost:8800/alterarsenha`, {
        id_usuario: senhaData.id_usuario,
        senhaAntiga,
        senhaNova,
      });
      showSuccess("Senha alterada com sucesso!");
    } catch (err) {
      console.error("Erro ao alterar a senha:", err);
      setError("Erro ao alterar a senha. Verifique suas informações.");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate(-1); // Navega para a página anterior
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/home");
    }, 1500);
  };

  return (
    <div>
      <h1>Alterar senha</h1>
      <div>
        <p>Usuário Atual: {senhaData.nome}</p>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label>Senha Antiga: <span className="asterisco">*</span></label>
            <input
              type="password"
              name="senhaAntiga"
              value={senhaData.senhaAntiga}
              onChange={handleChange}
              required
              className="senha-input"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Nova Senha: <span className="asterisco">*</span></label>
            <input
              type="password"
              name="senhaNova"
              value={senhaData.senhaNova}
              onChange={handleChange}
              required
              className="senha-input"
            />
          </div>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Confirmar</button>
        <button className="voltar" onClick={handleClick}>
        Voltar
      </button>
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

export default AlterarSenha;
