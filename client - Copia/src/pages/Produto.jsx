import axios from "axios";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Produto = () => {
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco_unitario: false,  // Adicionando promocao ao estado inicial
    fk_id_categoria: null,
  });

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const handleChange = (e) => {
    setProduto((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/viewProduto");
    }, 1200);
  };


  const handleClick = async (e) => {
    e.preventDefault();
    const { nome,descricao, preco_unitario, fk_id_categoria } = produto;

    if (!nome ||!preco_unitario) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }
    try {
      await axios.post("http://localhost:8800/readProduto", produto);
      console.log("Produto adicionado com sucesso");
      showSuccess("Produto adicionado com sucesso");
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

  const primeiroCampoRef = useRef(null);


  useEffect(() => {
    // Quando o componente for montado, o campo recebe o foco
    if (primeiroCampoRef.current) {
      primeiroCampoRef.current.focus();
    }
  }, [])

  console.log(produto);
  return (
    <div>
      
    <div class="Produto">
      <div className="form">
        <h1>Novo Produto</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>Nome: <label className="asterisco">*</label></p>
        <input
          type="text"
          ref={primeiroCampoRef}
          placeholder="Nome"
          name="nome"
          onChange={handleChange}
          required
        />
        <p>Descrição:</p>
        <input
          type="text"
          placeholder="descricao"
          name="descricao"
          onChange={handleChange}
        />

        <p>Preço Regular: <label className="asterisco">*</label></p>
        <input
          type="number"
          placeholder="preco_unitario"
          name="preco_unitario"
          onChange={handleChange}
          required
        />
        <p>Categoria: <label className="asterisco">*</label></p>
        <select
          name="fk_id_categoria"
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

        <button onClick={handleClick}>Adicionar</button>
      </div>
    </div>
    {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <span>{successMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produto;
