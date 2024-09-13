import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    nome: "",
    login: "",
    senha: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/register", inputs);
      navigate("/books");
    } catch (err) {
      setError(err.response.data);
    }
  };
console.log(inputs);
  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
      <input
          required
          type="text"
          placeholder="nome"
          name="nome"
          onChange={handleChange}
        />
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
        <button onClick={handleSubmit}>Registrar</button>
        {err && <p>{err}</p>}
        <span>
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;