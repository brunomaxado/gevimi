import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Certifique-se de que o axios está importado
import Tooltip from './tooltip';

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
  const [clientes, setClientes] = useState([]); // State para armazenar os clientes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const buscarEndereco = async (cep) => {
    if (validateCEP(cep)) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;

        if (!data.erro) {
          setCliente((prev) => ({
            ...prev,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf // Adiciona o estado, se necessário
          }));
          setError(null);
        } else {
          setError("CEP não encontrado.");
        }
      } catch (err) {
        console.error("Erro ao buscar endereço:", err);
        setError("Erro ao buscar endereço.");
      }
    } else {
      setError("CEP inválido.");
    }
  };

  useEffect(() => {
    if (primeiroCampoRef.current) {
      primeiroCampoRef.current.focus();
    }
  }, []);

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
  }, []);

  const isCpfCadastrado = (cpf) => {
    return clientes.some(
      (c) => c.cpf === cpf && c.id_cliente !== cliente.id_cliente
    );
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
      <Tooltip text="Elementos com asterisco vermelho são obrigatórios">
        <button type="button">?</button>
      </Tooltip>
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
            <label> CEP: </label>
            <input
              type="text"
              placeholder="CEP"
              name="cep"
              value={cliente.cep}
              onChange={(e) => {
                handleChange(e);
                buscarEndereco(e.target.value); // Chama a função ao alterar o CEP
              }}
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
