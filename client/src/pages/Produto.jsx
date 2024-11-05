import axios from "axios";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FormProduto from "../components/formProduto";
import HelpProduto from "../components/modalHelpProduto";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


const Produto = () => {
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco_unitario: "", // Corrigido para string para capturar valores numéricos
    fk_id_categoria: null,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isHelpProdutoOpen, setIsHelpProdutoOpen] = useState(false); // Estado para o modal de ajuda

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Função para exibir mensagem de sucesso
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/viewProduto");
    }, 1200);
  };

  // Manipula mudanças nos campos do formulário
  const handleChange = (e) => {
    setProduto((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Manipula o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, preco_unitario } = produto;

    if (!nome || !preco_unitario) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    try {
      await axios.post("http://localhost:8800/readProduto", produto);
      console.log("Produto adicionado com sucesso");
      showSuccess("Produto adicionado com sucesso");
    } catch (err) {
      console.log(err);
      setError("Erro ao adicionar o produto.");
    }
  };

  // Carrega as categorias ao montar o componente
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

  return (
    <div>
       <div>
        <button onClick={() => setIsHelpProdutoOpen(true)}>
          <HelpOutlineIcon />
        </button>
      </div>

      {/* Modal de ajuda */}
      <HelpProduto
        isOpen={isHelpProdutoOpen}
        onRequestClose={() => setIsHelpProdutoOpen(false)}
      />

      <div className="form"> 
  <h1>NOVO PRODUTO</h1>

  <FormProduto
          produto={produto}
          categorias={categorias}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={error} // Passa o estado de erro para o FormProduto
          initialData={produto} // Passa os dados iniciais para o FormProduto
        />

    {/* Modal de sucesso */}
    {showSuccessModal && (
      <div className="success-modal">
        <div className="success-modal-content">
          <span>{successMessage}</span>
        </div>
      </div>
    )}
  </div>
  </div>

  );
};

export default Produto;
