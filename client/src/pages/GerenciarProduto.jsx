import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GerenciarProduto = () => {
  const [book, setBook] = useState({
    nome: "",
    descricao: "",
    promocao: false,
    preco_desconto: null,
    preco_unitario: null,
    fk_id_categoria: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  // Função para buscar os dados do produto
  const fetchProduto = async () => {
    try {
      console.log("Fetching product with ID:", bookId);
      const response = await axios.get(`http://localhost:8800/books/${bookId}`);
      setBook(response.data);
    } catch (err) {
      console.error("Erro ao buscar o produto:", err);
      setError("Produto não encontrado.");
    }
  };


  useEffect(() => {
    fetchProduto();

    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:8800/categoria");
        setCategorias(response.data);
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    };

    fetchCategorias();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handlePromocaoChange = (e) => {
    const value = e.target.value === "true";
    setBook((prev) => ({
      ...prev,
      promocao: value,
      preco_desconto: value ? prev.preco_desconto : null,  // Limpa preco_desconto se promocao for false
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      console.log("Produto atualizado com sucesso");
      navigate("/");
    } catch (err) {
      console.error("Erro ao atualizar o produto:", err);
      setError("Erro ao atualizar o produto.");
    }
  };
  console.log(book.preco_desconto); // Adicione isto dentro do componente

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="form">
        <h1>ALTERAR PRODUTO</h1>
        <input
          type="text"
          placeholder="Nome"
          name="nome"
          value={book.nome}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Descrição"
          name="descricao"
          value={book.descricao}
          onChange={handleChange}
        />

        <div>
          <label>Promoção:</label>
          <input
            type="radio"
            name="promocao"
            value="true"
            checked={book.promocao} // Simplificando a condição
            onChange={handlePromocaoChange}
          />
          Sim
          <input
            type="radio"
            name="promocao"
            value="false"
            checked={!book.promocao} // Negando o valor para o outro radio button
            onChange={handlePromocaoChange}
          />
          Não
        </div>
        <input
          type="number"
          placeholder="Preço com desconto"
          name="preco_desconto"
          value={book.preco_desconto || ""}
          onChange={handleChange}
          style={{
            marginRight: "10px",
            backgroundColor: book.promocao ? "" : "#d3d3d3", // Cinza escuro quando desabilitado
            color: book.promocao ? "" : "#6c757d",           // Texto em cinza claro quando desabilitado
          }}
          disabled={!book.promocao} // Desabilita o campo quando promocao for false
        />



        <input
          type="number"
          placeholder="Preço unitário"
          name="preco_unitario"
          value={book.preco_unitario || ""}
          onChange={handleChange}
        />

        <select
          name="fk_id_categoria"
          value={book.fk_id_categoria}
          onChange={handleChange}
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria.id_categoria} value={categoria.id_categoria}>
              {categoria.nome}
            </option>
          ))}
        </select>

        <button onClick={handleClick}>Atualizar</button>
      </div>
    </div>
  );
};

export default GerenciarProduto;