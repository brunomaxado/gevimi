import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
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

  // Função para formatar o valor para exibição
  const applyPriceMask = (value) => {
    if (!value) return "R$ 0,00";

    let numericValue = parseFloat(value);
    if (isNaN(numericValue)) return "R$ 0,00";

    // Formata o número no padrão BRL com 2 casas decimais
    const formattedValue = numericValue
      .toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return `R$ ${formattedValue}`;
  };

  // Função para buscar os dados do produto
  const fetchProduto = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/readProduto/${produtoId}`);
      const produtoData = response.data;

      // Aplica a máscara no preço unitário ao carregar os dados
      produtoData.preco_unitario = applyPriceMask(String(produtoData.preco_unitario));
      setProduto(produtoData);
    } catch (err) {
      console.error("Erro ao buscar o produto:", err);
      setError("Produto não encontrado.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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

  // Função que trata as alterações nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduto((prev) => {
      if (name === "preco_unitario") {
        // Mantém o valor como número para salvar, mas aplica máscara apenas na exibição
        const numericValue = value.replace(/[^\d,.-]/g, ""); // Limpa os caracteres inválidos
        return { ...prev, [name]: numericValue }; // Armazena o número sem máscara
      }
      return { ...prev, [name]: value };
    });
  };

  // Função para submeter o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nome, preco_unitario, fk_id_categoria } = produto;

    if (!nome || !preco_unitario) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    if (preco_unitario === "R$ 0,00") {
      setError("Preço deve ser maior que 0.");
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
        <FormProduto
          produto={produto}
          categorias={categorias}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={error}
          initialData={produto}
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
