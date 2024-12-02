import axios from "axios";
import React, { useState, useEffect, useContext, useRef  } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import FormProduto from "../components/formProduto";
const GerenciarProduto = () => {
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco_unitario: "",
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
      const response = await axios.get(`http://localhost:8800/readProduto/${produtoId}`);
      const produtoData = response.data;
  
      // Converte o preço em string e aplica a máscara corretamente
      produtoData.preco_unitario = applyPriceMask(produtoData.preco_unitario.toFixed(2)); 
  
      setProduto(produtoData);
    } catch (err) {
      console.error("Erro ao buscar o produto:", err);
      setError("Produto não encontrado.");
    }
  };
  
  const applyPriceMask = (value) => {
    if (!value) return "R$ 0,00"; // Valor padrão caso esteja vazio ou indefinido
  
    const numericValue = parseFloat(value).toFixed(2); // Garante duas casas decimais
    return `R$ ${numericValue
      .replace(".", ",") // Usa vírgula como separador decimal
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`; // Adiciona pontos para milhares
  };
  
  
  
  const applyPriceMask2 = (value) => {
    let numericValue = value.replace(/\D/g, ""); // Remove caracteres não numéricos
  
    numericValue = (numericValue / 100).toFixed(2) // Converte para decimal
      .replace(".", ",") // Usa vírgula como separador de decimais
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Adiciona pontos para milhares
  
    return `R$ ${numericValue}`;
  };
  
  
  
  useEffect(() => {
    window.scrollTo(0, 0); // Move a página para o topo
    fetchProduto();
  }, [produtoId]);

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
  
    setProduto((prev) => {
      if (name === "preco_unitario") {
        return { ...prev, [name]: applyPriceMask(value) };
      }
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { nome, preco_unitario, fk_id_categoria } = produto;
  
    if (!nome || !preco_unitario) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }
  
    const categoriaExiste = categorias.some(
      (categoria) => Number(categoria.id_categoria) === Number(fk_id_categoria)
    );
  
    if (!categoriaExiste) {
      setError("A categoria selecionada não é válida.");
      return;
    }
  
    // Remove o "R$" e converte para número antes de enviar
    const produtoFormatado = {
      ...produto,
      preco_unitario: parseFloat(
        preco_unitario.replace("R$ ", "").replace(/\./g, "").replace(",", ".")
      ),
    };
  
    try {
      await axios.put(`http://localhost:8800/readProduto/${produtoId}`, produtoFormatado);
      console.log("Produto atualizado com sucesso");
      showSuccess("Produto atualizado com sucesso!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Erro ao atualizar o produto.";
      setError(errorMessage);
      console.error("Erro ao atualizar o produto:", err);
    }
  };
  
  
 const formatarPreco = (valor) => {
  if (!valor) return "";
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

  
  
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/viewProduto");
    }, 1500);
  };

  return (
    <div>
      <div className="form">
      <h1>EDITAR PRODUTO</h1>
        {/* Utilizando o FormProduto aqui */}
        <FormProduto
          produto={produto}
          categorias={categorias}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={error} // Passa o estado de erro para o FormProduto
          initialData={produto} // Passa os dados iniciais para o FormProduto
        />
  
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