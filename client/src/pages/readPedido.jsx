import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../style.css'; // Certifique-se de importar o arquivo CSS
import { Link } from "react-router-dom";

const ReadPedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]); 
  const [produtos, setProdutos] = useState([]); 
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPedidoId, setSelectedPedidoId] = useState(null);
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
    const produto = produtos.find((u) => u.id_produto === id); 
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

  const getStatus = (status) => {
    switch (status) {
        case 1: return "Finalizado";
        case 2: return "Em andamento";
        case 3: return "Não finalizado";
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


  const handleClickFinalizar = async (id) => {
    try {
      // Envia o status atualizado para 'finalizado' (1)
      await axios.put(`http://localhost:8800/pedido/${id}`, { status: 1 });
      console.log("Pedido finalizado com sucesso");
  
      // Atualiza a lista de pedidos após a atualização
      const res = await axios.get("http://localhost:8800/pedido");
      setPedidos(res.data);
    } catch (err) {
      console.error("Erro ao finalizar o pedido:", err);
      setError("Erro ao finalizar o pedido.");
    }
  };
  
console.log(selectedPedidoId);
  return (
    <div className="tabela">
      <h1>Pedidos e Itens</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
          {pedidos.map((pedido) => (
            <tr key={pedido.id_produto}>
              <td>{pedido.id_pedido}</td>
              <td>{getClienteNome(pedido.fk_id_cliente)}</td>
              <td>{getTipoEntrega(pedido.tipo)}</td> {/* Exibindo o texto da entrega */}
              <td>{getStatus(pedido.status)}</td>
              <td>{getFormaPagamento(pedido.forma_pagamento)}</td> {/* Exibindo o texto da forma de pagamento */}
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
  
  <button
    className={pedido.status === 1 ? "finalizar button-disabled" : "finalizar"}
    onClick={() => handleClickFinalizar(pedido.id_pedido)}
    disabled={pedido.status === 1} // Desabilita o botão se o status for 'Finalizado'
  >
    Finalizar
  </button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadPedido;
