import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Tooltip from './tooltip';
import InputMask from 'react-input-mask';

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

const FormViewCliente = ({ onSubmit, initialData = {} }) => {
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

  const [error, setError] = useState(null);
  const primeiroCampoRef = useRef(null);
  const [clientes, setClientes] = useState([]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="form-container">
      <div className="cliente">
        <div className="form-row">
          <div className="form-group">
            <label> Nome: </label>
            <input
              type="text"
              placeholder="Nome"
              name="nome"
              ref={primeiroCampoRef}
              value={cliente.nome}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label> CEP: </label>
            <InputMask
              type="text"
              mask="99999-999"
              placeholder="CEP"
              name="cep"
              value={cliente.cep}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label> CPF: </label>
            <InputMask
              type="text"
              mask="999.999.999-99"
              placeholder="CPF"
              name="cpf"
              value={cliente.cpf}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label> Celular: </label>
            <InputMask
              type="text"
              mask="(99) 99999-9999"
              placeholder="Celular"
              name="celular"
              value={cliente.celular}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label> Cidade: </label>
            <input
              type="text"
              placeholder="Cidade"
              name="cidade"
              value={cliente.cidade}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label> Logradouro: </label>
            <input
              type="text"
              placeholder="Logradouro"
              name="logradouro"
              value={cliente.logradouro}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label> Bairro: </label>
            <input
              type="text"
              placeholder="Bairro"
              name="bairro"
              value={cliente.bairro}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="form-group">
            <label> Número: </label>
            <input
              type="text"
              placeholder="Número"
              name="numero"
              value={cliente.numero}
              onChange={handleChange}
              readOnly
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
              readOnly
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormViewCliente;
