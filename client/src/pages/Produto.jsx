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
      navigate("/home");
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
    <div>
      <div className="form">
        <h1>Novo Produto</h1>
        <input
          type="text"
          placeholder="Nome"
          name="nome"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="descricao"
          name="descricao"
          onChange={handleChange}
        />

        <div>
          <label>Promoção:</label>
          <input
            type="radio"
            name="promocao"
            value="true"
            checked={book.promocao === true}
            onChange={handlePromocaoChange}
          /> True
          <input
            type="radio"
            name="promocao"
            value="false"
            checked={book.promocao === false}
            onChange={handlePromocaoChange}
          /> False
        </div>

        {book.promocao && (
          <input
            type="number"
            placeholder="preco_desconto"
            name="preco_desconto"
            onChange={handleChange}
          />
        )}

        <input
          type="number"
          placeholder="preco_unitario"
          name="preco_unitario"
          onChange={handleChange}
        />

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

        <button onClick={handleClick}>add</button>
      </div>
    </div>
  );
};

export default Produto;
