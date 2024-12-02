import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../pedidounico.css';

const ReadPedidoUnico = () => {
  const [pedido, setPedido] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const location = useLocation();
  const pedidoId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/pedido/${pedidoId}`);
        setPedido(res.data);
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
        const response = await axios.get("http://localhost:8800/allprodutos");
        setProdutos(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPedido();
    fetchClientes();
    fetchProdutos();
    fetchUsuarios();
  }, [pedidoId]);

  const getClienteDetalhes = (id) => {
    const cliente = clientes.find((c) => c.id_cliente === id);
    return cliente ? cliente : {};
  };

  const getUsuarioNome = (id) => {
    const usuario = usuarios.find((u) => u.id_usuario === id);
    return usuario ? usuario.nome : "N/A";
  };

  const getProdutoNome = (id) => {
    const produto = produtos.find((u) => u.id_produto === id);
    return produto ? produto.nome : "N/A";
  };

  const calcularTotalItens = (itensPedido) => {
    return itensPedido.reduce((total, item) => {
      return total + (item.preco_unitario_atual ? item.preco_unitario_atual * item.quantidade : 0);
    }, 0);
  };
console.log(clientes);
  const getFormaPagamento = (formaPagamento) => {
    switch (formaPagamento) {
      case 1:
        return "Dinheiro";
      case 2:
        return "Pix";
      case 3:
        return "Débito";
      case 4:
        return "Crédito";
      default:
        return "Desconhecido";
    }
  };
  console.log(pedido);
  const getEnderecoCliente = (id) => {
    const cliente = getClienteDetalhes(id);
    if (cliente && cliente.id_cliente) {
      return `${cliente.cidade || "N/A"}, ${cliente.cep || "N/A"}, ${cliente.bairro || "N/A"}, ${cliente.logradouro || "N/A"}, ${cliente.numero || "N/A"}`;
    }
    return "Endereço não encontrado";
  };
  const getTipoEntrega = (tipoEntrega) => {
    switch (tipoEntrega) {
      case 1:
        return "Entrega";
      case 2:
        return "Entrega iFood";
      case 3:
        return "Retirada";
      default:
        return "Desconhecido";
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case 1:
        return "Finalizado";
      case 2:
        return "Produção";
      case 3:
        return "Não finalizado";
      default:
        return "Desconhecido";
    }
  };
  const getPedidoFrete = (pedidoId) => {
    const pedidoItem = pedido.itensPedido.find((u) => u.id_pedido === pedidoId);
    return pedidoItem ? pedidoItem.frete : "N/A";
  };
  
  if (!pedido) return <p>Carregando...</p>;

  return (
    <div>  <h1>Detalhes do Pedido:</h1> 
    <div className="centralizar-pedido">

      <form className="form-container-pedido2">
      <div className="form-esquerda-pedido2">
        <div className="form-row-pedido">
        < div className="form-group-pedido">
        <label>Tipo:</label>
        <input type="text" value={getTipoEntrega(pedido.pedido.tipo) || "N/A"} readOnly />
        </div>
        < div className="form-group-pedido">
        <label>Status:</label>
        <input type="text" value={getStatus(pedido.pedido.status) || "N/A"} readOnly />
        </div>
        < div className="form-group-pedido">
        <label>Feito pelo Usuário:</label>
        <input type="text" value={getUsuarioNome(pedido.pedido.fk_id_usuario)} readOnly />
        </div>
        < div className="form-group-pedido">
        <label>Data Realizado:</label>
        <input type="text" value={pedido.pedido.data_realizado && !isNaN(Date.parse(pedido.pedido.data_realizado))
                  ? new Date(pedido.pedido.data_realizado).toLocaleString()
                  : "Sem data"} readOnly />
        </div>
        </div>
        <div className="form-row-pedido">
        < div className="form-group-pedido">
        <label>Cliente:</label>
        <input type="text" value={getClienteDetalhes(pedido.pedido.fk_id_cliente).nome || "N/A"} readOnly />

        </div>
     
          {(pedido.pedido.status==1 || pedido.pedido.status==2 || pedido.pedido.status==3) &&
        < div className="form-group-pedido">
        <label>Data entrega:</label>
            <input
              type="text"
              value={
                pedido.pedido.data_para_entregar && !isNaN(Date.parse(pedido.pedido.data_para_entregar))
                  ? new Date(pedido.pedido.data_para_entregar).toLocaleString()
                  : "Sem data"
              }
              readOnly
            />
        </div> }

        </div>
        <div className="form-row-pedido">
        < div className="form-group-pedido">
        
        <label>Endereço:</label>
        <input type="text" value={getEnderecoCliente(pedido.pedido.fk_id_cliente)} readOnly />
        </div>
        </div>
        <div className="form-row-pedido">
        < div className="form-group-pedido">
        
        <label>Observação:</label>
          <input
            type="text"
            value={pedido.pedido.observacao || "Sem observação"}
            readOnly
          />
        </div>
        </div>
        
        </div>
        <div className="form-direita-pedido">
        <div className="form-row-pedido">
        < div className="form-group-pedido">  
        <label>Forma de Pagamento:</label>
            <input type="text" value={getFormaPagamento(pedido.pedido.forma_pagamento) || "N/A"} readOnly />   
        </div>
        < div className="form-group-pedido">    
        <label>Finalizado em:</label>
            <input
              type="text"
              value={pedido.pedido.data_finalizado && !isNaN(Date.parse(pedido.pedido.data_finalizado))
                ? new Date(pedido.pedido.data_finalizado).toLocaleString()
                : "Sem data"
              }
              readOnly
            /> 
        </div>
        </div>


        <div className="form-row-pedido">
        <div className="form-group-pedido">
  <label>Produtos:</label>
  <textarea
   value={
    pedido.itensPedido && pedido.itensPedido.length > 0
      ? pedido.itensPedido
          .map(
            (item) =>
              `${getProdutoNome(item.fk_id_produto)} x${item.quantidade} - Uni: R$ ${
                !isNaN(parseFloat(item.preco_unitario_atual))
                  ? parseFloat(item.preco_unitario_atual)
                      .toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : "N/A"
              }`
          )
          .join("\n") // Adiciona quebra de linha entre os itens
      : "Nenhum item"
  }
  
    readOnly
    rows={pedido.itensPedido && pedido.itensPedido.length > 0 ? pedido.itensPedido.length : 1}
    className="form-control-pedido" // Use uma classe para estilizar o textarea
  />
</div>
</div>

<div className="form-row-pedido">
  <div className="form-group-pedido">
    <label><b>Frete:</b></label>
    <input
    type="text"
    value={
      !isNaN(parseFloat(pedido.pedido.frete)) && parseFloat(pedido.pedido.frete) !== 0
        ? `R$ ${parseFloat(pedido.pedido.frete).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : "R$ 0,00"
    }
    readOnly
  />
  </div>

  <div className="form-group-pedido">
    <label><b>Total Produtos:</b></label>
    <input
      type="text"
      value={`R$ ${
        calcularTotalItens(pedido.itensPedido)
          ? calcularTotalItens(pedido.itensPedido)
              .toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          : "R$ 0,00"
      }`}
      readOnly
    />
  </div>
</div>

<div className="form-row-pedido">
  <div className="form-group-pedido">
    <label><b>Total Geral (Frete + Produtos):</b></label>
    <input
      type="text"
      value={`R$ ${
        (
          (pedido.pedido.frete && !isNaN(parseFloat(pedido.pedido.frete))
            ? parseFloat(pedido.pedido.frete)
            : 0) + calcularTotalItens(pedido.itensPedido)
        )
          .toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      }`}
      readOnly
    />
  </div>
</div>



</div>
        </form>



   
    </div>
    <Link to={`/readPedido`}>
        <button className="voltar">Voltar</button>
      </Link>
    </div>
  );
};

export default ReadPedidoUnico;
