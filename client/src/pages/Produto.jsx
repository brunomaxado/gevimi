import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Produto = () => {
  const [book, setBook] = useState({
    nome: "",
    descricao: "",
    promocao: false,  // Adicionando promocao ao estado inicial
    preco_desconto: null,
    preco_unitario: null,
    fk_id_categoria: null,
  });

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [categorias, setCategorias] = useState([]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePromocaoChange = (e) => {
    const value = e.target.value === "true";
    setBook((prev) => ({
      ...prev,
      promocao: value,
      preco_desconto: value ? prev.preco_desconto : null,  // Limpa o preco_desconto se promocao for false
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
      console.log("EXECUTEI");
      navigate("/viewProduto");
    } catch (err) {
      console.log(err);
      // setError(true);
    }
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:8800/categoria");
        setCategorias(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategorias();
  }, []);
  console.log(book);
  return (
    <div class="Produto">
      <div className="form">
        <h1>Novo Produto</h1>
        <p>Nome:</p>
        <input
          type="text"
          placeholder="Nome"
          name="nome"
          onChange={handleChange}
        />
        <p>Descrição:</p>
        <input
          type="text"
          placeholder="descricao"
          name="descricao"
          onChange={handleChange}
        />

        <div class="promo">
          <label><p>Promoção:</p></label>
          <p>sim</p>
          <input
            type="radio"
            name="promocao"
            value="true"
            checked={book.promocao === true}
            onChange={handlePromocaoChange}
          />
          <p>não</p>
          <input
            type="radio"
            name="promocao"
            value="false"
            checked={book.promocao === false}
            onChange={handlePromocaoChange}
          />
        </div>

        {book.promocao && (
          <><p>Preço da promoção:</p><input
            type="number"
            placeholder="preco_desconto"
            name="preco_desconto"
            onChange={handleChange} /></>
        )}
        <p>Preço Regular:</p>
        <input
          type="number"
          placeholder="preco_unitario"
          name="preco_unitario"
          onChange={handleChange}
        />
        <p>Categoria:</p>
        <select
          name="fk_id_categoria"
          onChange={handleChange}
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria.id_categoria} value={categoria.id_categoria}>
              {categoria.nome}
            </option>
          ))}
        </select>

        <button onClick={handleClick}>adicionar</button>
      </div>
    </div>
  );
};

export default Produto;
