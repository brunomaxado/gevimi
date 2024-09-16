import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../style.css'; // Certifique-se de importar o arquivo CSS
import { Link } from "react-router-dom";

const ReadPedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]); // Renaming cliente to clientes
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
    const fetchClientes = async () => { // Renaming the function to fetchClientes
      try {
        const response = await axios.get("http://localhost:8800/allcliente");
        setClientes(response.data); // Renaming cliente to clientes
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPedidos();
    fetchClientes();
  }, []);

  const getClienteNome = (id) => {
    const cliente = clientes.find((c) => c.id_cliente === id); // Using clientes state
    return cliente ? cliente.nome : "N/A";
  };

  return (
    <div className="tabela">
    <h1>Pedidos e Itens</h1>
    <table>
      <thead>
        <tr>
        <th> ID</th>
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
        {pedidos.map((pedido) => (
          <tr key={pedido.id_produto}>
            <td>{pedido.id_produto}</td>
            <td>{pedido.tipo}</td>
            <td>{pedido.forma_pagamento}</td>
            <td>{pedido.observacao}</td>
            <td>{new Date(pedido.data_para_entregar).toLocaleString()}</td>
            <td>{new Date(pedido.data_realizado).toLocaleString()}</td>
            <td>{getClienteNome(pedido.fk_id_cliente)}</td>
            <td>{pedido.fk_id_usuario}</td>
            <td>
              <button className="delete">Delete</button>
              <button className="update">
                <Link>Update</Link>
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
