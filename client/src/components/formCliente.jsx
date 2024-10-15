import React, { useState, useRef, useEffect } from "react";

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
    rua: "",
    numero: "",
    cidade: "",
    bairro: "",
    ...initialData // Preenche os dados iniciais, se houver
  });

  const [error, setError] = useState(null);
  const primeiroCampoRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
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

    // Chama a função passada via props para submeter os dados
    onSubmit(cliente);
  };

  useEffect(() => {
    if (primeiroCampoRef.current) {
      primeiroCampoRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} class="form-container">
      {error && <p id="erro">{error}</p>}
      <div className="cliente">

      <div className="form-row"> 
    <div className="form-group nome"> {/* Campo Nome ocupará 100% da largura */}
        <label> Nome: <span className="asterisco">*</span> </label>
        <input
            type="text"
            placeholder="Nome"
            name="nome"
            ref={primeiroCampoRef}
            value={cliente.nome}
            onChange={handleChange}
            required
            style={{ width: "100%" }} // Garanta que o campo de entrada ocupe 100%
        />
    </div> 
</div>

<div className="form-row"> 
    <div className="form-group">
        <p>
            <p> CPF:  <label className="asterisco">*</label> </p>
            <input
                type="number"
                placeholder="CPF"
                name="cpf"
                value={cliente.cpf}
                onChange={handleChange}
                required
            />
        </p>
    </div> 
    <div className="form-group">
        <p>
            <p> CELULAR: <label className="asterisco">*</label> </p>
            <input
                type="number"
                placeholder="Celular"
                name="celular"
                value={cliente.celular}
                onChange={handleChange}
                required
            />
        </p>
    </div> 
</div> 

<div className="form-row"> 
    <div className="form-group">
        <p>
            <p> CIDADE: <label className="asterisco">*</label> </p>
            <input
                type="text"
                placeholder="Cidade"
                name="cidade"
                value={cliente.cidade}
                onChange={handleChange}
                required
            />
        </p>
    </div> 
    <div className="form-group">
        <p>
            <p> CEP: <label className="asterisco-branco">*</label> </p>
            <input
                type="number"
                placeholder="CEP"
                name="cep"
                value={cliente.cep}
                onChange={handleChange}
                
            />
        </p>
    </div> 
</div> 

<div className="form-row"> 
    <div className="form-group">
        <p>
            <p> BAIRRO:  <label className="asterisco">*</label> </p>
            <input
                type="text"
                placeholder="Bairro"
                name="bairro"
                value={cliente.bairro}
                onChange={handleChange}
                required
                style={{ width: "100%" }} // Garanta que o campo de entrada ocupe 100%
            />
        </p>
    </div> 
</div>
















      
        <h1>{initialData.nome ? "Editar Cliente" : "Adicionar Cliente"}</h1>
   
        
        <button type="submit">
          {initialData.nome ? "Salvar Alterações" : "Adicionar"}
        </button>
      </div>
    </form>
  );
};

export default FormCliente;
