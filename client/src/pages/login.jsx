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


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      //await axios.post("http://localhost:8800/login", inputs, { withCredentials: true });
      navigate("/home");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const primeiroCampoRef = useRef(null);

  useEffect(() => {
    // Quando o componente for montado, o campo recebe o foco
    if (primeiroCampoRef.current) {
      primeiroCampoRef.current.focus();
    }
  }, [])

  return (
    <div className="auth" id="login">
      <div id="imagem">
        <img src="../logo_login.png"></img>
      </div>

        <form className="container">
          <h1>Login</h1>
          <p>Usuário:</p>
          <input
            required
            type="text"
            ref={primeiroCampoRef}
            placeholder="usuário"
            name="login"
            onChange={handleChange}
          />
          <p>Senha:</p>
          <input
            required
            type="password"
            placeholder="senha"
            name="senha"
            onChange={handleChange}
          />
          <button className="btn" onClick={handleSubmit}>Entrar</button>
          {err && <p>{err}</p>}

        </form>
      </div>


  );
};

export default Login;