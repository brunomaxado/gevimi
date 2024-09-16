import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const validateCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;
  
  let sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf[i - 1]) * (11 - i);
  }
  let remainder = (sum * 10) % 11;
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
  return celular.length === 11;
};

const validateCEP = (cep) => {
  cep = cep.replace(/\D/g, '');
  return cep.length === 8;
};

const Cliente = () => {
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/readCliente");
    }, 1200);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { nome, cpf, celular, cep, cidade, bairro, rua } = cliente;

    if (!nome || !cpf || !celular || !cidade || !bairro || !rua || !cep) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

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
      await axios.post("http://localhost:8800/cliente", cliente);
      showSuccess("Cliente adicionado com sucesso");
    } catch (err) {
      console.error("Erro ao adicionar o cliente:", err);
      setError("Erro ao adicionar o cliente.");
    }
  };

  return (
    <div class="novoCliente">
      {error && <p id="erro">{error}</p>}
      <div class="cliente">
        <h1>Adicionar Cliente</h1>
        <p><input
          type="text"
          placeholder="Nome"
          name="nome"
          value={cliente.nome}
          onChange={handleChange}
          required
        /></p>
        <p>
        <input
          type="number"
          placeholder="CPF"
          name="cpf"
          value={cliente.cpf}
          onChange={handleChange}
        /></p>
        <p>
        <input
          type="number"
          placeholder="Celular"
          name="celular"
          value={cliente.celular}
          onChange={handleChange}
        /></p>
        <p>
        <input
          type="number"
          placeholder="CEP"
          name="cep"
          value={cliente.cep}
          onChange={handleChange}
        /></p>
        <p>
        <input
          type="text"
          placeholder="Cidade"
          name="cidade"
          value={cliente.cidade}
          onChange={handleChange}
        /></p>
        <p>
        <input
          type="text"
          placeholder="Bairro"
          name="bairro"
          value={cliente.bairro}
          onChange={handleChange}
        /></p>
        <p>
        <input
          type="text"
          placeholder="Rua"
          name="rua"
          value={cliente.rua}
          onChange={handleChange}
        /></p>
        <p>
        <input
          type="text"
          placeholder="Número"
          name="numero"
          value={cliente.numero}
          onChange={handleChange}
        /></p>
        <p>
        <button onClick={handleClick}>Adicionar</button>          
        </p>
      </div>

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

export default Cliente;
