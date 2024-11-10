import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import '../style.css';

export const RelatorioPedido = () => {
  const navigate = useNavigate();

  // Estado para armazenar os filtros
  const [filters, setFilters] = useState({
    inicioPeriodo: "",
    fimPeriodo: "",
    inicioDataEntrega: "",
    fimDataEntrega: "",
    inicioFinalizado: "",
    fimFinalizado: "",
    clientes: [],  // Armazenar { id, nome }
    usuarios: [],  // Armazenar { id, nome }
    formaPagamento: [],
    tipoPedido: [],
    status: [],
  });

  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8800/cliente")
      .then(response => setClientes(response.data))
      .catch(error => console.error("Erro ao buscar clientes:", error));

    axios.get("http://localhost:8800/usuario")
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Erro ao buscar usuários:", error));
      axios.get("http://localhost:8800/readProduto")
      .then(response => setProdutos(response.data))
      .catch(error => console.error("Erro ao buscarproduto:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const getPlaceholder = (selected) => (selected.length === 0 ? "Todos" : "");
  console.log(filters);
  return (
    <div>
      <h1>Relatório de Pedidos</h1>
      <div className="filter-container-pai">
        <div className="filters-container">
          {/* Filtros de Período e Data */}
          <div>
            <label> Início Período Realizado: <span className="asterisco">*</span> </label>
            <input
              type="datetime-local"
              value={filters.inicioPeriodo}
              onChange={handleChange}
              name="inicioPeriodo"
            />
          </div>
          <div>
            <label> Fim Período Realizado: <span className="asterisco">*</span> </label>
            <input
              type="datetime-local"
              value={filters.fimPeriodo}
              onChange={handleChange}
              name="fimPeriodo"
            />
          </div>

          {/* Filtros de Data de Entrega */}
          <div>
            <label> Início Data Entrega: </label>
            <input
              type="datetime-local"
              value={filters.inicioDataEntrega}
              onChange={handleChange}
              name="inicioDataEntrega"
            />
          </div>
          <div>
            <label> Fim Data Entrega: </label>
            <input
              type="datetime-local"
              value={filters.fimDataEntrega}
              onChange={handleChange}
              name="fimDataEntrega"
            />
          </div>

          {/* Filtros de Data de Finalização */}
          <div>
            <label> Início Data Finalizado: </label>
            <input
              type="datetime-local"
              value={filters.inicioFinalizado}
              onChange={handleChange}
              name="inicioFinalizado"
            />
          </div>
          <div>
            <label> Fim Data Finalizado: </label>
            <input
              type="datetime-local"
              value={filters.fimFinalizado}
              onChange={handleChange}
              name="fimFinalizado"
            />
          </div>
        </div>

        {/* Autocomplete para Forma de Pagamento */}
        <Autocomplete
          multiple
          options={[{ label: "Dinheiro", value: 1 }, { label: "Pix", value: 2 }, { label: "Débito", value: 3 }, { label: "Crédito", value: 4 }]}
          getOptionLabel={(option) => option.label}
          onChange={(event, newValue) => setFilters((prevFilters) => ({
            ...prevFilters,
            formaPagamento: newValue.map((item) => item.value),
          }))}
          value={filters.formaPagamento.map((value) => ({ label: ["Dinheiro", "Pix", "Débito", "Crédito"][value - 1], value }))}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Forma de Pagamento"
              placeholder={getPlaceholder(filters.formaPagamento)}
            />
          )}
          style={{ marginBottom: '20px', width: '300px' }}
        />

        {/* Autocomplete para Tipo de Pedido */}
        <Autocomplete
          multiple
          options={[{ label: "Entrega", value: 1 }, { label: "Entrega Ifood", value: 2 }, { label: "Retirada", value: 3 }, { label: "Comum", value: 4 }]}
          getOptionLabel={(option) => option.label}
          onChange={(event, newValue) => setFilters((prevFilters) => ({
            ...prevFilters,
            tipoPedido: newValue.map((item) => item.value),
          }))}
          value={filters.tipoPedido.map((value) => ({ label: ["Entrega", "Entrega Ifood", "Retirada", "Comum"][value - 1], value }))}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Tipo de Pedido"
              placeholder={getPlaceholder(filters.tipoPedido)}
            />
          )}
          style={{ marginBottom: '20px', width: '300px' }}
        />

        {/* Autocomplete para Status */}
        <Autocomplete
          multiple
          options={[{ label: "Finalizado", value: 1 }, { label: "Pendente", value: 2 }, { label: "Andamento", value: 3 }]}
          getOptionLabel={(option) => option.label}
          onChange={(event, newValue) => setFilters((prevFilters) => ({
            ...prevFilters,
            status: newValue.map((item) => item.value),
          }))}
          value={filters.status.map((value) => ({ label: ["Finalizado", "Pendente", "Andamento"][value - 1], value }))}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Status"
              placeholder={getPlaceholder(filters.status)}
            />
          )}
          style={{ marginBottom: '20px', width: '300px' }}
        />

        {/* Autocomplete para Clientes */}
        <Autocomplete
          multiple
          options={clientes}
          getOptionLabel={(option) => option.nome}
          onChange={(event, newValue) => setFilters((prevFilters) => ({
            ...prevFilters,
            clientes: newValue.map((item) => ({ id: item.id, nome: item.nome })),
          }))}
          value={filters.clientes}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Clientes"
              placeholder={getPlaceholder(filters.clientes)}
            />
          )}
          style={{ marginBottom: '20px', width: '300px' }}
        />

        {/* Autocomplete para Usuários */}
        <Autocomplete
          multiple
          options={usuarios}
          getOptionLabel={(option) => option.nome}
          onChange={(event, newValue) => setFilters((prevFilters) => ({
            ...prevFilters,
            usuarios: newValue.map((item) => ({ id: item.id, nome: item.nome })),
          }))}
          value={filters.usuarios}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Usuários"
              placeholder={getPlaceholder(filters.usuarios)}
            />
          )}
          style={{ marginBottom: '20px', width: '300px' }}
        />
      </div>

      <div className="actions">
        <button onClick={() => {
          setFilters({
            inicioPeriodo: "",
            fimPeriodo: "",
            inicioDataEntrega: "",
            fimDataEntrega: "",
            inicioFinalizado: "",
            fimFinalizado: "",
            clientes: [],
            usuarios: [],
            formaPagamento: [],
            tipoPedido: [],
            status: [],
          });
        }}>Limpar Filtros</button>
      </div>
    </div>
  );
};

export default RelatorioPedido;
