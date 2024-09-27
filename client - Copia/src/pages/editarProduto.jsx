import axios from "axios";
import React, { useState, useEffect, useContext, useRef  } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GerenciarProduto = () => {
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco_unitario: null,
    fk_id_categoria: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const produtoId = location.pathname.split("/")[2];
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const fetchProduto = async () => {
    try {
      console.log("Fetching product with ID:", produtoId);
      const response = await axios.get(`http://localhost:8800/readProduto/${produtoId}`);
      setProduto(response.data);
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
  }, [produtoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  };



  const handleClick = async (e) => {
    e.preventDefault();
    
    const { nome, preco_unitario } = produto;
  
    if (!nome || !preco_unitario) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }
  
    console.log("ID da categoria do livro:", produto.fk_id_categoria);
    console.log("Categorias disponíveis:", categorias);
  
    const categoriaExiste = categorias.some(
      (categoria) => Number(categoria.id_categoria) === Number(produto.fk_id_categoria)
    );
  
    if (!categoriaExiste) {
      setError("A categoria selecionada não é válida.");
      return;
    }
  
    try {
      await axios.put(`http://localhost:8800/readProduto/${produtoId}`, produto);
      console.log("Produto atualizado com sucesso");
    
      showSuccess("Produto atualizado com sucesso");
    } catch (err) {
      console.error("Erro ao atualizar o produto:", err);
      setError("Erro ao atualizar o produto.");
    }
  };
  
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/viewProduto"); 
    }, 1500);
  };
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
      <div className="form">
        <h1>ALTERAR PRODUTO</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          ref={primeiroCampoRef}
          placeholder="Nome"
          name="nome"
          value={produto.nome}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Descrição"
          name="descricao"
          value={produto.descricao}
          onChange={handleChange}
        />


        <input
          type="number"
          placeholder="Preço unitário"
          name="preco_unitario"
          value={produto.preco_unitario || ""}
          onChange={handleChange}
        />

        <select
          name="fk_id_categoria"
          value={produto.fk_id_categoria}
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

export default GerenciarProduto;