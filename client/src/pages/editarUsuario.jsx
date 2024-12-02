import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useModified } from "../context/ModifiedContext";
const EditarUsuario = () => {
  const [usuario, setUsuario] = useState({
    nome: "",
    login: "",
    administrador: "0",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const usuarioId = location.pathname.split("/")[2];
  const [showPassword, setShowPassword] = useState(false);
  const { isModified, setIsModified } = useModified(); // Acessando o contexto
  const [showSairModal, setShowSairModal] =   useState(null);
  const handleConfirmExit = () => {
    navigate(-1);
    setShowSairModal(false); // Fecha o modal
  };
  
  const handleCancelExit = () => {
    setShowSairModal(false); // Fecha o modal sem realizar a ação
  };
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
  console.log("isModified:", isModified);
  useEffect(() => {
    // Reseta isModified ao desmontar o componente
    return () => {
      setIsModified(false);
    };
  }, [setIsModified]);


  useEffect(() => {
    fetchUsuario();
  }, [usuarioId]);

  const handleClick = (e) => {
    e.preventDefault();
    if(isModified)
    {
        setShowSairModal(true);
        return;
    }
    navigate(-1); // Navega para a página anterior
  };
  const handleChange = (e) => {
    setIsModified(true); // Marca o formulário como modificado
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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
      showSuccess("Usuário atualizado com sucesso!");
      console.log("Usuario atualizado com sucesso")
      setTimeout(() => {
        navigate("/readUsuario");
      }, 1500);

    } catch (err) {
      console.error("Erro ao atualizar o usuário:", err);
      setError("Erro ao atualizar o usuário.");
    }
  };

  const handlePasswordChange = async () => {
    if (!novaSenha) {
      setError("A senha não pode estar vazia.");
      console.log("senha vazia");
      return;
    }

    if (novaSenha.length < 8) {
      setError("A senha não está nos padrões.");
      console.log("Senha curta");
      return;
    }

    if (!/\d/.test(novaSenha)) {
      setError("A senha não está nos padrões.");
      console.log("Senha sem número");
      return;
    }

    try {
      // Envia o id_usuario junto com a nova senha
      await axios.put(`http://localhost:8800/updatesenha`, {
        id_usuario: usuarioId, // Passando o id do usuário
        senhaNova: novaSenha, // Nova senha
      });

      showSuccess("Senha atualizada com sucesso!");
      setShowPasswordModal(false);
      setNovaSenha("");
    } catch (err) {
      console.error("Erro ao atualizar a senha:", err);
      setError("Erro ao atualizar a senha.");
    }
  };


  const showSuccess = (message) => {
    console.log("Exibindo mensagem de sucesso:", message); // Verifica se a função está sendo chamada
    setSuccessMessage(message);
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      setSuccessMessage(""); // Limpa a mensagem ao fechar o modal
      console.log("Modal de sucesso fechado.");


    }, 2500);
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

          <button
            className="editar-senha"
            type="button"
            onClick={() => {
              setError(""); // Limpa qualquer erro anterior ao abrir o modal
              setShowPasswordModal(true);
            }}
          >
            Nova Senha
          </button>

          <div className="form-group">
            <label>Nome:     <span className="asterisco">*</span></label>
            <input
              type="text"
              name="nome"
              value={usuario.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Login:     <span className="asterisco">*</span></label>
            <input
              type="text"
              name="login"
              value={usuario.login}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Administrador:     <span className="asterisco">*</span></label>
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
          <button className="voltar-usuario" onClick={handleClick}>
            Voltar
          </button>

          <button className="editar-usuario">Confirmar</button>
         

        </form>


      </div>
      {error && <p className="error-message">{error}</p>}

      {showSairModal &&
       
       
       <div className="modal">
         <div className="modal-content">
           <button className="close-modal" onClick={handleCancelExit}>X</button>
           <h2 style={{ textAlign: 'center' }}>Dados não salvos!</h2>
           <p style={{ textAlign: 'center' }}>Dados não salvos! Seus dados não serão salvos se não confirmar o envio.</p>
           <div className="modal-div">
             <button className="modal-button" onClick={handleConfirmExit}>Sair</button>
             <button className="modal-button" onClick={handleCancelExit}>Ficar</button>
           </div>
         </div>
       </div>
       
   }
      {showPasswordModal && (
        <div className="modal">
          <div className="modal-content4">
            <button className="close-modal" onClick={() => setShowPasswordModal(false)}>X</button>

            <h2>Atualizar Senha</h2>
            <label>Senha:      <span className="asterisco">*</span></label>

            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="senha"
              name="senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="senha-input"
              style={{ width: "100%", paddingRight: "50px" }} // Espaço extra para o botão
            />
            <p> A senha deve ter no mínimo 8 dígitos e letras e números.</p>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                top: "50%", // Centraliza verticalmente
                right: "4%", // Cola o botão na borda direita
                transform: "translateY(-190%)", // Alinha verticalmente ao centro do input
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              {showPassword ? "🙈" : "👁"}
            </button>



            <div className="modal-actions">
              <button className="modal-button" onClick={() => setShowPasswordModal(false)}>Cancelar</button>
              <button
                className="modal-button"
                onClick={() => {
                  setError(""); // Limpa qualquer erro anterior para exibir apenas o atual
                  handlePasswordChange(); // Chama a função que verifica e atualiza a senha
                }}
              >
                Confirmar
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
        </div>
      )}
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
