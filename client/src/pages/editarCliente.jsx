import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Funções de validação
const validateCPF = (cpf) => {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) return false;

  // Verifica se todos os dígitos são iguais (CPFs como '11111111111' são inválidos)
  if (/^(\d)\1+$/.test(cpf)) return false;

  // Verificação do primeiro dígito verificador
  let sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf[i - 1]) * (11 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf[9])) return false;

  // Verificação do segundo dígito verificador
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf[i - 1]) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;

  // Retorna verdadeiro se o CPF for válido
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

  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para o modal de sucesso
const [successMessage, setSuccessMessage] = useState(""); // Estado para a mensagem de sucesso
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
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/readCliente"); // Redirecionar após 3 segundos
    }, 1000);
  };
  
  const handleClick = async (e) => {
    e.preventDefault();
    const { nome, cpf, celular, cep, cidade, bairro, rua } = cliente;
    // Verificação de campos obrigatórios
    if (!nome || !cpf || !celular || !cidade || !bairro || !rua || !cep) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }
  
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
      showSuccess("Cliente atualizado com sucesso"); // Chama a função de sucesso
    } catch (err) {
      console.error("Erro ao atualizar o cliente:", err);
      setError("Erro ao atualizar o cliente.");
    }
  };
  
console.log(cliente);
return (
  <div>
    {error && <p style={{ color: "red" }}>{error}</p>}
    
    {/* Modal de sucesso */}
    {showSuccessModal && (
       <div className="success-modal">
          <div className="success-modal-content">
          <span>{successMessage}</span>
        </div>
      </div>
    )}

    <div>
      <h1>Alterar Cliente</h1>
      <form onSubmit={handleClick}>
        <input
          type="text"
          placeholder="Nome"
          name="nome"
          value={cliente.nome}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="CPF"
          name="cpf"
          value={cliente.cpf}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Celular"
          name="celular"
          value={cliente.celular}
          onChange={handleChange}
          maxLength={11} // Para garantir que o celular tenha o tamanho correto
        />
        <input
          type="number"
          placeholder="CEP"
          name="cep"
          value={cliente.cep}
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
        <button type="submit">Atualizar Cliente</button>
      </form>
    </div>
  </div>
);

};

export default EditarCliente;
