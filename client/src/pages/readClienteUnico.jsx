import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../clienteunico.css';

const ReadClienteUnico = () => {
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const clienteId = location.pathname.split("/")[2];

  const fetchCliente = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/cliente/${clienteId}`);
      setCliente(response.data);
    } catch (err) {
      console.error("Erro ao buscar o cliente:", err);
      setError("Cliente não encontrado.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCliente();
  }, [clienteId]);

  if (error) return <p>{error}</p>;
  if (!cliente) return <p>Carregando os dados do cliente...</p>;

  return (
    <div className="body-Cliente">
      <h1>Visualizar Cliente</h1>
      <form>
        <div className="infos">
          <div className="form-group nome">
            <label>Nome:</label>
            <input type="text" value={cliente.nome} readOnly />
          </div>
          <div className="form-group cep">
            <label>CEP:</label>
            <input type="text" value={cliente.cep} readOnly />
          </div>
          <div className="form-group cpf">
            <label>CPF:</label>
            <input type="text" value={cliente.cpf} readOnly />
          </div>
          <div className="form-group celular">
            <label>Celular:</label>
            <input type="text" value={cliente.celular} readOnly />
          </div>
        </div>

        <div className="endereco">
          <div className="form-group cidade">
            <label>Cidade:</label>
            <input type="text" value={cliente.cidade} readOnly />
          </div>
          <div className="form-group logradouro">
            <label>Logradouro:</label>
            <input type="text" value={cliente.logradouro} readOnly />
          </div>
          <div className="form-group bairro">
            <label>Bairro:</label>
            <input type="text" value={cliente.bairro} readOnly />
          </div>
          <div className="form-group numero">
            <label>Número:</label>
            <input type="text" value={cliente.numero} readOnly />
          </div>
        </div>

        <div className="obs">
          <label>Observação:</label>
          <input type="text" value={cliente.observacao || "Sem observação"} readOnly />
        </div>
        <Link to={"/readCliente"}>
          <button className="back-button">
            Voltar
          </button>
        </Link>
      </form>
    </div>
  );
};

export default ReadClienteUnico;
