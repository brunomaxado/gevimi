import React, { useRef, useEffect } from "react";

const FormProduto = ({ produto, categorias, handleChange, handleSubmit, error }) => {
  const primeiroCampoRef = useRef(null);

  useEffect(() => {
    // Quando o componente for montado, o campo nome recebe o foco
    if (primeiroCampoRef.current) {
      primeiroCampoRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
   
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <p>Nome: <label className="asterisco">*</label></p>
      <input
        type="text"
        ref={primeiroCampoRef}
        placeholder="Nome"
        name="nome"
        value={produto.nome}
        onChange={handleChange}
        required
      />

      <p>Descrição:</p>
      <input
        type="text"
        placeholder="Descrição"
        name="descricao"
        value={produto.descricao}
        onChange={handleChange}
      />

      <p>Preço Regular: <label className="asterisco">*</label></p>
      <input
        type="number"
        placeholder="Preço Unitário"
        name="preco_unitario"
        value={produto.preco_unitario}
        onChange={handleChange}
        required
      />

      <p>Categoria: <label className="asterisco">*</label></p>
      <select
        name="fk_id_categoria"
        value={produto.fk_id_categoria || ""}
        onChange={handleChange}
        required
      >
        <option value="">Selecione uma categoria</option>
        {categorias.map((categoria) => (
          <option key={categoria.id_categoria} value={categoria.id_categoria}>
            {categoria.nome}
          </option>
        ))}
      </select>
       
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default FormProduto;
