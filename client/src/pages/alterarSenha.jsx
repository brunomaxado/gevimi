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
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
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
  const [showSairModal, setShowSairModal] =   useState(null);
  const handleConfirmExit = () => {
    navigate(-1);
    setShowSairModal(false); // Fecha o modal
  };
  
  const handleCancelExit = () => {
    setShowSairModal(false); // Fecha o modal sem realizar a ação
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSenhaData((prev) => ({ ...prev, [name]: value }));
    setIsModified(true);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
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
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/; // Pelo menos 8 caracteres e 1 número
    if (!passwordRegex.test(senhaNova)) {
      setError("A senha deve conter no mínimo 8 digitos e ao menos 1 letra e 1 número.");
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
    if(isModified)
    {
        setShowSairModal(true);
        return;
    }
    navigate(-1); // Navega para a página anterior
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate(-1);
    }, 1500);
  };

  return (
    <div>
      <h1>Alterar senha</h1>
      <div>
        <p>Usuário Atual: {senhaData.nome}</p>
      </div>
      <form onSubmit={handleSubmit} className="form-container4">
        <div className="form-row">
          <div className="form-group">
            <label>Senha Antiga: <span className="asterisco">*</span></label>
        
<input
          required
          type={showPassword ? "text" : "password"}
          placeholder="senha antiga"
           name="senhaAntiga"
           value={senhaData.senhaAntiga}
          onChange={handleChange}
          className="senha-input"
          style={{ width: "100%", paddingRight: "50px" }}  // Espaço extra para o botão
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            top: "50%",
            right: "1%",
            transform: "translateY(-270%)",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {showPassword ? "🙈" : "👁"}
        </button>

          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Nova Senha: <span className="asterisco">*</span></label>



<input
          required
          type={showPassword2 ? "text" : "password"}
          placeholder="senha nova"
          name="senhaNova"
          value={senhaData.senhaNova}
          onChange={handleChange}
          className="senha-input"
          style={{ width: "100%", paddingRight: "50px" }}  // Espaço extra para o botão
        />
        <button
          type="button"
          onClick={togglePasswordVisibility2}
          style={{
            position: "absolute",
            top: "50%",
            right: "1%",
            transform: "translateY(-24%)",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {showPassword2 ? "🙈" : "👁"}
        </button>
















          </div>
        </div>
      
        <button className="editar-usuario " onClick={handleClick}>
        Voltar
      </button>
      
        <button type="submit" className="editar-usuario">Confirmar</button>

      </form>
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
      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <span>{successMessage}</span>
          </div>
        </div>
      )}
        {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AlterarSenha;
