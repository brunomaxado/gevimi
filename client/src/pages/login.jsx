import axios from "axios";
import React, { useState } from "react";
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
  
  return (
   // <div className="auth">
      <div class="bg-img">
      <form class="container">
      <h1>Login</h1>
        <input
          required
          type="text"
          placeholder="usuário"
          name="login"
          onChange={handleChange}
        />  
        <input
          required
          type="password"
          placeholder="senha"
          name="senha"
          onChange={handleChange}
        />
        <button class="btn" onClick={handleSubmit}>Entrar</button>
        {err && <p>{err}</p>}
        <span>
          Não tem uma conta? <Link to="/register">Registrar</Link>
        </span>
      </form>
      </div>
    //</div>
  );
};

export default Login;