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
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="login"
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
        <button onClick={handleSubmit}>Entrar</button>
        {err && <p>{err}</p>}
        <span>
          Não tem uma conta? <Link to="/register">Registrar</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;