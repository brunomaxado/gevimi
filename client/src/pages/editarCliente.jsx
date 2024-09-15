import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Funções de validação
const validateCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  let sum = 0, remainder;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf[i - 1]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf[9])) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf[i - 1]) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  return remainder === parseInt(cpf[10]);
};

const validateCelular = (celular) => {
  celular = celular.replace(/\D/g, '');
  return celular.length === 11; // Formato para celulares com DDD e 9 dígitos
};

const validateCEP = (cep) => {
  cep = cep.replace(/\D/g, '');
  return cep.length === 8; // Formato para CEP com 8 dígitos
};

const EditarCliente = () => {
  const [cliente, setCliente] = useState({
    nome: "",
    cpf: "",
    celular: "",
    cep: "",
    rua: "",
    numero: "",
    cidade: "",
    bairro: ""
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
    const { nome, cpf, celular, cep } = cliente;

    // Validações
    if (!validateCPF(cpf)) {
      setError("CPF inválido.");
      return;
    }
    if (!validateCelular(celular)) {
      setError("Celular inválido. Deve conter 11 dígitos.");
      return;
    }
    if (!validateCEP(cep)) {
      setError("CEP inválido. Deve conter 8 dígitos.");
      return;
    }

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
        />
        <input
          type="text"
          placeholder="Celular"
          name="celular"
          value={cliente.celular}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="CEP"
          name="cep"
          value={cliente.cep}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Cidade"
          name="cidade"
          value={cliente.cidade}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bairro"
          name="bairro"
          value={cliente.bairro}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Rua"
          name="rua"
          value={cliente.rua}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Número"
          name="numero"
          value={cliente.numero}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Atualizar</button>
      </div>
    </div>
  );
};

export default EditarCliente;
