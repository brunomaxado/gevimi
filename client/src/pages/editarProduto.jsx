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
      console.log("Fetching product with ID:", produtoId);
      const response = await axios.get(`http://localhost:8800/readProduto/${produtoId}`);
      setProduto(response.data);
    } catch (err) {
      console.error("Erro ao buscar o produto:", err);
      setError("Produto não encontrado.");
    }
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
    setProduto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nome, preco_unitario } = produto;

    if (!nome || !preco_unitario) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

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