import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import FormViewCliente from "../components/formViewCliente";

const ReadClienteUnico = () => {
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const clienteId = location.pathname.split("/")[2];
  const [cep, setCep] = useState(null);

  const fetchCliente = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/cliente/${clienteId}`);
      const clienteData = response.data;
  
      if (clienteData.cep) {
        // Busca o UF a partir do CEP e concatena com a cidade
        const uf = await fetchUF(clienteData.cep);
        setCliente({ ...clienteData, cidade: `${uf} - ${clienteData.cidade}` });
      } else {
        console.warn("CEP não disponível para o cliente.");
        setCliente(clienteData);
      }
    } catch (err) {
      console.error("Erro ao buscar o cliente:", err);
      setError("Cliente não encontrado.");
    }
  };
  
  const fetchUF = async (cep) => {
    try {
      const formattedCEP = cep.replace(/\D/g, ""); // Remove caracteres não numéricos
      if (formattedCEP.length !== 8) {
        console.error("CEP inválido.");
        return "";
      }
  
      const response = await axios.get(`https://viacep.com.br/ws/${formattedCEP}/json/`);
      const { uf } = response.data;
  
      if (uf) {
        return uf; // Retorna apenas o UF
      } else {
        console.error("UF não encontrada no retorno da API.");
        return "";
      }
    } catch (error) {
      console.error("Erro ao buscar a UF:", error.message);
      return "";
    }
  };
  
  
  useEffect(() => {
    window.scrollTo(0, 0); // Move a página para o topo
    fetchCliente();
  }, [clienteId]);

  const handleSubmit = async (updatedCliente) => {
    try {
      // Envia os dados para o backend para atualizar o cliente
      await axios.put(`http://localhost:8800/cliente/${clienteId}`, updatedCliente);
      showSuccess("Cliente atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar o cliente:", err);
  
      // Verifica se há uma resposta de erro do servidor
      if (err.response && err.response.data && err.response.data.message) {
        // Exibe a mensagem de erro retornada pelo backend
        setError(err.response.data.message);
      } else {
        // Caso não haja mensagem de erro específica, exibe uma mensagem genérica
        setError("Erro ao atualizar o cliente. Tente novamente mais tarde.");
      }
    }
  };
  
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/readCliente");
    }, 1200);
  };

  return (
    <div>
      <h1>VISUALIZAR CLIENTE</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Modal de sucesso */}
      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      <div>
        {/* Renderiza o formulário somente se os dados do cliente já foram carregados */}
        {cliente ? (
          <FormViewCliente onSubmit={handleSubmit} initialData={cliente} />
        ) : (
          <p>Carregando os dados do cliente...</p>
        )}
      </div>
    </div>
  );
};

export default ReadClienteUnico;
