import React, { useRef, useEffect } from "react";

const FormProduto = ({ produto, categorias, handleChange, handleSubmit, error, initialData }) => {
  const primeiroCampoRef = useRef(null);

  useEffect(() => {
    // Quando o componente for montado, o campo nome recebe o foco
    if (primeiroCampoRef.current) {
      primeiroCampoRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="form-row">
        <div className="form-group">
          <label> Nome: <span className="asterisco">*</span> </label>
          <input
            type="text"
            ref={primeiroCampoRef}
            placeholder="Nome"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            required
          />
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
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
  <div className="form-group">
    <label> Preço Unitário: <span className="asterisco">*</span> </label>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="number"
        placeholder="Preço Unitário"
        name="preco_unitario"
        value={produto.preco_unitario}
        onChange={handleChange}
        required
        style={{ flex: 1 }}
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
        </div>
      </div>

      <button type="submit">
        {initialData.nome ? "ATUALIZAR" : "ADICIONAR"}
      </button>
    </form>
  );
};

export default FormProduto;
