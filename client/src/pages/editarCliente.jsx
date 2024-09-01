import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditarCliente = () => {
  const [cliente, setCliente] = useState({
    nome: "",
    cpf: "",
    celular: "",
    cep: "",
    logradouro: "",
    numero: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const clienteId = location.pathname.split("/")[2];

  // Função para buscar os dados do cliente
  const fetchCliente = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/cliente/${clienteId}`);
      setCliente(response.data);
    } catch (err) {
      console.error("Erro ao buscar o cliente:", err);
      setError("Cliente não encontrado.");
    }
  };

  useEffect(() => {
    fetchCliente();
  }, [clienteId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/cliente/${clienteId}`, cliente);
      console.log("Cliente atualizado com sucesso");
      navigate("/readCliente");
    } catch (err) {
      console.error("Erro ao atualizar o cliente:", err);
      setError("Erro ao atualizar o cliente.");
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h1>Alterar Cliente</h1>
        <input
          type="text"
          placeholder="Nome"
          name="nome"
          value={cliente.nome}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="CPF"
          name="cpf"
          value={cliente.cpf}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Celular"
          name="celular"
          value={cliente.celular}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="CEP"
          name="cep"
          value={cliente.cep}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Logradouro"
          name="logradouro"
          value={cliente.logradouro}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Número"
          name="numero"
          value={cliente.numero}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
        <button onClick={handleClick}>Atualizar</button>
      </div>
    </div>
  );
};

export default EditarCliente;
