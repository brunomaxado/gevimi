import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Certifique-se de que o axios está importado

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

const FormCliente = ({ onSubmit, initialData = {} }) => {
  const [cliente, setCliente] = useState({
    nome: "",
    cpf: "",
    celular: "",
    cep: "",
    logradouro: "",
    numero: "",
    cidade: "",
    bairro: "",
    observacao: "",
    ...initialData // Preenche os dados iniciais, se houver
  });

  const [error, setError] = useState(null);
  const primeiroCampoRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };



  useEffect(() => {
    if (primeiroCampoRef.current) {
      primeiroCampoRef.current.focus();
    }
  }, []);
  const [clientes, setClientes] = useState([]); // Novo state para armazenar os clientes

  const fetchAllClientes = async () => {
    try {
      const res = await axios.get("http://localhost:8800/cliente");
      setClientes(res.data);
    } catch (err) {
      console.error("Erro ao buscar clientes:", err);
    }
  };
  
  useEffect(() => {
    fetchAllClientes(); // Carrega os clientes quando o componente é montado
    if (primeiroCampoRef.current) {
      primeiroCampoRef.current.focus();
    }
  }, []);
  const isCpfCadastrado = (cpf) => {
    return clientes.some((c) => c.cpf === cpf); // Verifica se algum cliente já possui o CPF
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { nome, cpf, celular, cep, cidade, bairro, logradouro } = cliente;
  
    if (!nome || !cpf || !celular || !cidade || !bairro || !logradouro || !cep) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }
  
    if (!validateCPF(cpf)) {
      setError("CPF inválido.");
      return;
    }
  
    if (isCpfCadastrado(cpf)) {
      setError("Este CPF já está cadastrado.");
      return;
    }
  
    onSubmit(cliente); // Submete o formulário se todas as validações passarem
  };
  
  return (
    <form onSubmit={handleSubmit} className="form-container">
 

  <div className="cliente">

    {/* Nome */}
    <div className="form-row">
      <div className="form-group">
        <label> Nome: <span className="asterisco">*</span> </label>
        <input
          type="text"
          placeholder="Nome"
          name="nome"
          ref={primeiroCampoRef}
          value={cliente.nome}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    {/* CPF e Celular */}
    <div className="form-row">
      <div className="form-group">
        <label> CPF: <span className="asterisco">*</span> </label>
        <input
          type="text"
          placeholder="CPF"
          name="cpf"
          value={cliente.cpf}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label> Celular: <span className="asterisco">*</span> </label>
        <input
          type="text"
          placeholder="Celular"
          name="celular"
          value={cliente.celular}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    {/* Cidade e CEP */}
    <div className="form-row">
      <div className="form-group">
        <label> Cidade: <span className="asterisco">*</span> </label>
        <input
          type="text"
          placeholder="Cidade"
          name="cidade"
          value={cliente.cidade}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label> CEP:  </label>
        <input
          type="text"
          placeholder="CEP"
          name="cep"
          value={cliente.cep}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    {/* Bairro, Logradouro e Número */}
    <div className="form-row">
      <div className="form-group">
        <label> Bairro: <span className="asterisco">*</span> </label>
        <input
          type="text"
          placeholder="Bairro"
          name="bairro"
          value={cliente.bairro}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label> Logradouro: <span className="asterisco">*</span> </label>
        <input
          type="text"
          placeholder="Logradouro"
          name="logradouro"
          value={cliente.logradouro}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label> Número: <span className="asterisco">*</span> </label>
        <input
          type="text"
          placeholder="Número"
          name="numero"
          value={cliente.numero}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    {/* Observação */}
    <div className="form-row">
      <div className="form-group">
        <label> Observação: </label>
        <input
          type="text"
          placeholder="Observação"
          name="observacao"
          value={cliente.observacao}
          onChange={handleChange}
        
        />
      </div>
    </div>
    {error && <p id="erro">{error}</p>}
    <button type="submit">
      {initialData.nome ? "ATUALIZAR" : "ADICIONAR"}
    </button>
  </div>
</form>


  );
  
};

export default FormCliente;
