import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Funções de validação
const validateCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  // Lógica simplificada para verificar CPF válido (não abrangente)
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
  // Remove caracteres não numéricos e verifica o comprimento
  celular = celular.replace(/\D/g, '');
  return celular.length === 11; // Formato para celulares com DDD e 9 dígitos
};

const validateCEP = (cep) => {
  // Remove caracteres não numéricos e verifica o comprimento
  cep = cep.replace(/\D/g, '');
  return cep.length === 8; // Formato para CEP com 8 dígitos
};

const ModalCliente = ({ onClose, adicionarCliente }) => {
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
        const response = await axios.post("http://localhost:8800/cliente", cliente);
        console.log("Cliente adicionado com sucesso");
  
        // Chama a função para adicionar o cliente no componente pai e fechar o modal
        adicionarCliente(response.data);
  
      } catch (err) {
        console.error("Erro ao adicionar o cliente:", err);
        setError("Erro ao adicionar o cliente.");
      }
    
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <button style={closeButtonStyle} onClick={onClose}>X</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <h1>Adicionar Cliente</h1>
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
          placeholder="cidade"
          name="cidade"
          value={cliente.cidade}
          onChange={handleChange}
        />
         <input
          type="text"
          placeholder="bairro"
          name="bairro"
          value={cliente.bairro}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="rua"
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
          <button style={modalButtonStyle} onClick={handleClick}>Atualizar</button>
        </div>
      </div>
    </div>
  );
};

// Estilos inline
const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '5px',
  width: '400px',
  position: 'relative',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
};

const modalButtonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  borderRadius: '5px',
  marginTop: '10px',
};

export default ModalCliente;
