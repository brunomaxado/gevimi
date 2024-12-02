import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    login: "",
    senha: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const primeiroCampoRef = useRef(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);  // Login via contexto
      // await axios.post("http://localhost:8800/login", inputs, { withCredentials: true });
      navigate("/home");
    } catch (err) {
      setError(err.response?.data || "Erro no login");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // Quando o componente for montado, o campo recebe o foco
    if (primeiroCampoRef.current) {
      primeiroCampoRef.current.focus();
    }
  }, []);

  return (
    <div className="auth" id="login">

      <div id="imagem">
        <img src="../logo_login.png" alt="Logo" />
      </div>
  
      <form className="container">
        <h1>Login</h1>

        <label className="label-usuario">
          Usuário: <span className="asterisco">*</span>
        </label>
        <input
          required
          type="text"
          ref={primeiroCampoRef}
          placeholder="usuário"
          name="login"
          value={inputs.login}  // Vincula ao estado de login
          onChange={handleChange}
        />

        <label className="label-usuario">
          Senha: <span className="asterisco">*</span>
        </label>
        <input
          required
          type={showPassword ? "text" : "password"}
          placeholder="senha"
          name="senha"
          value={inputs.senha}  // Vincula ao estado de senha
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
            transform: "translateY(100%)",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {showPassword ? "🙈" : "👁"}
        </button>

        <button className="btn" onClick={handleSubmit}>
          Entrar
        </button>
       
      </form>
      <div>   {err && <p style={{ color: 'red' }}>{err}</p>}</div>
        
    </div>
  );
};

export default Login;
