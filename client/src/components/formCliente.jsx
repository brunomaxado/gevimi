import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Tooltip from './tooltip';
import InputMask from 'react-input-mask';
import { useModified } from "../context/ModifiedContext";
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

const FormCliente = ({ onSubmit, initialData = {}, onModified }) => {
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
    ...initialData
  });
 
  const { isModified, setIsModified } = useModified(); // Acessando o contexto
  const [error, setError] = useState(null);
  const primeiroCampoRef = useRef(null);
  const [clientes, setClientes] = useState([]);
  console.log("isModified:", isModified);
  useEffect(() => {
  // Reseta isModified ao desmontar o componente
  return () => {
    setIsModified(false);
  };
}, [setIsModified]);
  const handleChange = (e) => {
    
    setIsModified(true); // Marca o formulário como modificado
    const { name, value } = e.target;
    let cleanedValue = value;
    if (name === "cpf" || name === "celular" || name === "cep") {
      cleanedValue = value.replace(/\D/g, '');
    }
    
    // Atualiza o estado do cliente
    setCliente((prev) => {
      const newCliente = { ...prev, [name]: cleanedValue };
  
      // Verifica se houve modificação nos campos
   
      return newCliente;
    });
  
  };
  
  const buscarEnderecoPorCEP = async (cep) => {
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
            estado: data.uf
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

  const buscarCEPPorCidadeLogradouro = async () => {
    const { cidade, logradouro } = cliente;
    if (cidade && logradouro) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/PR/${cidade}/${logradouro}/json/`);
        const data = response.data;

        if (data && data.length > 0) {
          setCliente((prev) => ({
            ...prev,
            cep: data[0].cep,
            bairro: data[0].bairro
          }));
          setError(null);
        } else {
          setError("Não foi possível encontrar um CEP para esta cidade e logradouro.");
        }
      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
        setError("Erro ao buscar CEP.");
      }
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
    fetchAllClientes();
  }, []);

  const isCpfCadastrado = (cpf) => {
    return clientes.some(
      (c) => c.cpf === cpf && c.id_cliente !== cliente.id_cliente
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nome, cpf, celular, cep, cidade, bairro, logradouro } = cliente;

    const cpfLimpo = cpf.replace(/\D/g, '');
    const celularLimpo = celular.replace(/\D/g, '');
    const cepLimpo = cep.replace(/\D/g, '');

    if (!nome || !cpfLimpo || !celularLimpo || !cidade || !bairro || !logradouro || !cepLimpo) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    if (!validateCPF(cpfLimpo)) {
      setError("CPF inválido.");
      return;
    }

    if (!validateCelular(celularLimpo)) {
      setError("Celular inválido.");
      return;
    }

    if (isCpfCadastrado(cpfLimpo)) {
      setError("Este CPF já está cadastrado.");
      return;
    }

    onSubmit({ ...cliente, cpf: cpfLimpo, celular: celularLimpo, cep: cepLimpo });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="cliente">
      
        <div className="form-row">
          <div className="form-group">
            <label> Nome:
              <span className="asterisco">*</span>
            </label>
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

        <div className="form-row">
          <div className="form-group">
            <label> CEP:
              <span className="asterisco">*</span>
            </label>
            <InputMask
              type="text"
              mask="99999-999"
              placeholder="CEP"
              name="cep"
              value={cliente.cep}
              onChange={(e) => {
                handleChange(e);
                buscarEnderecoPorCEP(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label> CPF:
              <span className="asterisco">*</span>
            </label>
            <InputMask
              type="text"
              mask="999.999.999-99"
              placeholder="CPF"
              name="cpf"
              value={cliente.cpf}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label> Celular:
              <span className="asterisco">*</span>
            </label>
            <InputMask
              type="text"
              mask="(99) 99999-9999"
              placeholder="Celular"
              name="celular"
              value={cliente.celular}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label> Cidade:
              <span className="asterisco">*</span>
            </label>
            <input
              type="text"
              placeholder="Cidade"
              name="cidade"
              value={cliente.cidade}
              onChange={handleChange}
              onBlur={buscarCEPPorCidadeLogradouro}
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
              onBlur={buscarCEPPorCidadeLogradouro}
              required
            />
          </div>
        </div>

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
        <p><span className="asterisco">*</span> Elementos com asterisco vermelho são obrigatórios</p>
        <button type="submit">
          CONFIRMAR
        </button>
        {error && <p id="erro">{error}</p>}
      </div>
    </form>
  );
};

export default FormCliente;
