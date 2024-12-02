import React, { useRef, useEffect, useState } from "react";
import { useModified } from "../context/ModifiedContext";
import { useNavigate } from "react-router-dom";

const FormProduto = ({ produto, categorias, handleChange, handleSubmit, error, initialData }) => {
  const primeiroCampoRef = useRef(null);
  const [preco, setPreco] = useState(produto.preco_unitario || "");
  const { isModified, setIsModified } = useModified(); // Acessando o contexto
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(-1); // Navega para a página anterior
  };
  useEffect(() => {
    if (primeiroCampoRef.current) {
      primeiroCampoRef.current.focus();
    }
  }, []);

  const formatarPreco = (valor) => {
    if (!valor) return "";
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  console.log("isModified:", isModified);

  useEffect(() => {
    // Reseta isModified ao desmontar o componente
    return () => {
      setIsModified(false);
    };
  }, [setIsModified]);

  const handlePrecoChange = (e) => {
    setIsModified(true); // Marca o formulário como modificado
    let valorDigitado = e.target.value;

    // Garantir que valorDigitado seja uma string
    valorDigitado = String(valorDigitado);

    // Remover todos os caracteres não numéricos
    valorDigitado = valorDigitado.replace(/\D/g, "");

    // Formatar o valor para moeda
    const precoFormatado = formatarPreco(valorDigitado / 100); // Divide por 100 para tratar como valor em reais

    // Atualizar estado com o valor formatado
    handleChange({
      ...e,
      target: {
        ...e.target,
        name: "preco_unitario",
        value: precoFormatado, // O valor será exibido com a máscara
      },
    });
  };

  // Modificar o handleChange para marcar o formulário como modificado em campos específicos
  const handleCustomChange = (e) => {
    setIsModified(true); // Marca o formulário como modificado
    handleChange(e);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-row">
        <div className="form-group">
          <label> Nome: <span className="asterisco">*</span> </label>
          <input
            type="text"
            ref={primeiroCampoRef}
            placeholder="Nome"
            name="nome"
            value={produto.nome}
            onChange={handleCustomChange} // Alterado para handleCustomChange
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label> Preço Unitário: <span className="asterisco">*</span> </label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Preço Unitário"
              name="preco_unitario"
              value={produto.preco_unitario || ""} // Garantir que o valor esteja vazio se não houver
              onChange={handlePrecoChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label> Categoria: <span className="asterisco">*</span> </label>
          <select
            name="fk_id_categoria"
            value={produto.fk_id_categoria || ""}
            onChange={handleCustomChange} // Alterado para handleCustomChange
            required
          >
            <option value="" disabled>Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id_categoria} value={categoria.id_categoria}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label> Descrição: </label>
          <input
            type="text"
            placeholder="Descrição"
            name="descricao"
            value={produto.descricao}
            onChange={handleCustomChange} // Alterado para handleCustomChange
          />
        </div>
      </div>

      <p>
        <span className="asterisco">*</span>
        Os campos marcados com asterisco vermelho são obrigatórios.
      </p>
      <button type="submit">
        Confirmar
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button className="voltar" onClick={handleClick}>
        Voltar
      </button>
    </form>
  );
};

export default FormProduto;
