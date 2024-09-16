import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../style.css'; // Certifique-se de importar o arquivo CSS

const ReadPedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para a pesquisa
  const [sortCriterion, setSortCriterion] = useState('id'); // Estado para o critério de ordenação
  const [isSortedAscending, setIsSortedAscending] = useState(true); // Estado para a ordem de ordenação (crescente ou decrescente)
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
  const pedidosPerPage = 5; // Número de pedidos exibidos por página
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

    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:8800/usuario");
        setUsuarios(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:8800/books");
        setProdutos(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllPedidos();
    fetchClientes();
    fetchProdutos();
    fetchUsuarios();
  }, []);

  const getClienteNome = (id) => {
    const cliente = clientes.find((c) => c.id_cliente === id);
    return cliente ? cliente.nome : "N/A";
  };

  const getUsuarioNome = (id) => {
    const usuario = usuarios.find((u) => u.id_usuario === id);
    return usuario ? usuario.nome : "N/A";
  };

  const getProdutoNome = (id) => {
    const produto = produtos.find((p) => p.id_produto === id);
    return produto ? produto.nome : "N/A";
  };

  const getProdutoPreco = (id) => {
    const produto = produtos.find((p) => p.id_produto === id);
    return produto ? produto.preco_unitario : 0;
  };

  const calcularTotalItens = (itensPedido) => {
    return itensPedido.reduce((total, item) => {
      const precoUnitario = getProdutoPreco(item.fk_id_produto);
      return total + (precoUnitario * item.quantidade);
    }, 0);
  };

  // Função para retornar o texto de acordo com a forma de pagamento
  const getFormaPagamento = (formaPagamento) => {
    switch (formaPagamento) {
      case 1: return "Dinheiro";
      case 2: return "Pix";
      case 3: return "Débito";
      case 4: return "Crédito";
      default: return "Desconhecido";
    }
  };

  // Função para retornar o texto de acordo com o tipo de entrega
  const getTipoEntrega = (tipoEntrega) => {
    switch (tipoEntrega) {
      case 1: return "Entrega";
      case 2: return "Entrega iFood";
      case 3: return "Retirada";
      default: return "Desconhecido";
    }
  };

  // Função para lidar com a pesquisa
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Função para lidar com a ordenação
  const handleSort = (criterion) => {
    const sortedPedidos = [...pedidos].sort((a, b) => {
      if (criterion === 'id') {
        return isSortedAscending
          ? a.id_pedido - b.id_pedido
          : b.id_pedido - a.id_pedido;
      } else if (criterion === 'data_entrega') {
        return isSortedAscending
          ? new Date(a.data_para_entregar) - new Date(b.data_para_entregar)
          : new Date(b.data_para_entregar) - new Date(a.data_para_entregar);
      } else if (criterion === 'data_realizacao') {
        return isSortedAscending
          ? new Date(a.data_realizado) - new Date(b.data_realizado)
          : new Date(b.data_realizado) - new Date(a.data_realizado);
      }
      return 0;
    });
    setPedidos(sortedPedidos);
    setSortCriterion(criterion);
    setIsSortedAscending(!isSortedAscending);
  };

  // Filtra os pedidos baseado no termo de pesquisa em múltiplos campos
  const filteredPedidos = pedidos.filter((pedido) =>
    getClienteNome(pedido.fk_id_cliente).toLowerCase().includes(searchTerm.toLowerCase()) ||
    pedido.id_pedido.toString().includes(searchTerm) ||
    getProdutoNome(pedido.itensPedido.map(item => item.fk_id_produto)).toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="tabela">
      <h1>Pedidos e Itens</h1>
      <p>
        <button onClick={() => handleSort('id')}>Ordenar por ID {isSortedAscending ? "Crescente" : "Decrescente"}</button>
        <button onClick={() => handleSort('data_entrega')}>Ordenar por Data de Entrega {isSortedAscending ? "Crescente" : "Decrescente"}</button>
        <button onClick={() => handleSort('data_realizacao')}>Ordenar por Data de Realização {isSortedAscending ? "Crescente" : "Decrescente"}</button>
      </p>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Procurar por ID, cliente, produto..."
        title="Digite um ID, nome do cliente, produto, etc."
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Forma de Pagamento</th>
            <th>Produto/xUnidade</th>
            <th>Total</th>
            <th>Data de Entrega</th>
            <th>Data de Realização</th>
            <th>Data Finalizado</th>
            <th>Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentPedidos.map((pedido) => (
            <tr key={pedido.id_pedido}>
              <td>{pedido.id_pedido}</td>
              <td>{getClienteNome(pedido.fk_id_cliente)}</td>
              <td>{getTipoEntrega(pedido.tipo)}</td>
              <td>{pedido.status}</td>
              <td>{getFormaPagamento(pedido.forma_pagamento)}</td>
              <td>
                {pedido.itensPedido.map((item) => (
                  <div key={item.id_item_pedido}>
                    {getProdutoNome(item.fk_id_produto)} x{item.quantidade};
                  </div>
                ))}
              </td>
              <td>
                R${calcularTotalItens(pedido.itensPedido).toFixed(2)}
              </td>
              <td>
                {pedido.data_para_entregar && !isNaN(Date.parse(pedido.data_para_entregar))
                  ? new Date(pedido.data_para_entregar).toLocaleString()
                  : "Sem data"}
              </td>
              <td>{new Date(pedido.data_realizado).toLocaleString()}</td>
              <td>{pedido.data_finalizado ? new Date(pedido.data_finalizado).toLocaleString() : "Não finalizado"}</td>
              <td>{getUsuarioNome(pedido.fk_id_usuario)}</td>
              <td>
                <button className="delete">Cancelar</button>
                <button className="update">
                  <Link to={`/readPedido/${pedido.id_pedido}`}>Gerenciar</Link>
                </button>
              </td>
            </tr>
          ))}
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
