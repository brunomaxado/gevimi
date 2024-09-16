import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../style.css'; // Certifique-se de importar o arquivo CSS
import { Link } from "react-router-dom";

const ReadPedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); // Estado para a pesquisa
  const [isSorted, setIsSorted] = useState(false); // Estado para ordenação
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
  const [sortBy, setSortBy] = useState("data_para_entregar"); // Estado para a ordenação por data
  const pedidosPerPage = 10; // Número de pedidos por página
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPedidos = async () => {
      try {
        const res = await axios.get("http://localhost:8800/pedido");
        setPedidos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:8800/allcliente");
        setClientes(response.data); 
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllPedidos();
    fetchClientes();
    fetchProdutos();
    fetchUsuarios();
  }, []);

  // Função para obter o nome do cliente
  const getClienteNome = (id) => {
    const cliente = clientes.find((c) => c.id_cliente === id);
    const cliente = clientes.find((c) => c.id_cliente === id);
    return cliente ? cliente.nome : "N/A";
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setIsSorted(false); // Resetar a ordenação para o estado inicial
  };

  const handleSort = () => {
    const sortedPedidos = [...pedidos].sort((a, b) => {
      const dateA = new Date(a[sortBy]);
      const dateB = new Date(b[sortBy]);

      return isSorted
        ? dateA - dateB
        : dateB - dateA;
    });
    setPedidos(sortedPedidos);
    setIsSorted(!isSorted);
  };

  // Filtra os pedidos baseado no termo de pesquisa em múltiplos campos
  const filteredPedidos = pedidos.filter((pedido) =>
    pedido.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pedido.forma_pagamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pedido.observacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getClienteNome(pedido.fk_id_cliente).toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(pedido.fk_id_usuario).toLowerCase().includes(searchTerm.toLowerCase()) // Convertendo fk_id_usuario para string
  );

  // Paginação: calcula os pedidos para a página atual
  const indexOfLastPedido = currentPage * pedidosPerPage;
  const indexOfFirstPedido = indexOfLastPedido - pedidosPerPage;
  const currentPedidos = filteredPedidos.slice(indexOfFirstPedido, indexOfLastPedido);

  // Muda para a próxima página
  const paginateNext = () => {
    if (currentPage < Math.ceil(filteredPedidos.length / pedidosPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Muda para a página anterior
  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Define a data de realização como a mesma data da entrega por padrão
  const defaultDataRealizacao = (dataParaEntregar) => {
    return dataParaEntregar || new Date().toISOString().slice(0, 10);
  };

  // Verifica se a data de entrega é válida (não pode ser uma data passada)
  const isValidDataEntrega = (data) => {
    const today = new Date().toISOString().slice(0, 10);
    return data >= today;
  };

  return (
    <div className="tabela">
      <h1>Pedidos e Itens</h1>
      <p>
        <button onClick={handleSort}>Ordenar por {sortBy === "data_para_entregar" ? "Data de Entrega" : "Data do Pedido"} {isSorted ? "Antigos Primeiro" : "Recentes Primeiro"}</button>
      </p>
      <div>
        <label>
          Ordenar por:
          <select value={sortBy} onChange={handleSortChange}>
            <option value="data_para_entregar">Data de Entrega</option>
            <option value="data_realizado">Data do Pedido</option>
          </select>
        </label>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Procurar por tipo, cliente, pagamento..."
        title="Digite para pesquisar"
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Forma de Pagamento</th>
            <th>Observação</th>
            <th>Data de Entrega</th>
            <th>Data de Realização</th>
            <th>Cliente</th>
            <th>Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentPedidos.map((pedido) => {
            const dataEntrega = new Date(pedido.data_para_entregar).toISOString().slice(0, 10);
            const dataRealizacao = pedido.data_realizado ? new Date(pedido.data_realizado).toISOString().slice(0, 10) : defaultDataRealizacao(dataEntrega);
            const dataEntregaValida = isValidDataEntrega(dataEntrega);

            return (
              <tr key={pedido.id_produto}>
                <td>{pedido.id_produto}</td>
                <td>{pedido.tipo}</td>
                <td>{pedido.forma_pagamento}</td>
                <td>{pedido.observacao}</td>
                <td>{dataEntregaValida ? new Date(pedido.data_para_entregar).toLocaleString() : "Data inválida"}</td>
                <td>{dataRealizacao}</td>
                <td>{getClienteNome(pedido.fk_id_cliente)}</td>
                <td>{pedido.fk_id_usuario}</td>
                <td>
                  <button className="delete">Delete</button>
                  <button className="update">
                    <Link to={`/editarPedido/${pedido.id_produto}`}>Update</Link>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="pagination">
        <button onClick={paginatePrev} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {Math.ceil(filteredPedidos.length / pedidosPerPage)}</span>
        <button onClick={paginateNext} disabled={currentPage === Math.ceil(filteredPedidos.length / pedidosPerPage)}>
          Próximo
        </button>
      </div>
    </div>
  );
};

export default ReadPedido;
