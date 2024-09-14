import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Pedido = () => {

  const [produto, setProduto] = useState([]);
  const [cliente, setCliente] = useState([]);
  
  const [pedido, setPedido] = useState({
    tipo: "",            // Define um valor padrão ou pode deixar vazio
    forma_pagamento: "",    // Define um valor padrão ou pode deixar vazio
    observacao: "",               // Valor inicial vazio
    data_para_entregar: "",       // Valor inicial vazio
    data_realizado: "",           // Valor inicial vazio
    fk_id_usuario: null,          // Valor inicial nulo
    fk_id_cliente: null,          // Valor inicial nulo
  });
  
  const [novoItem, setNovoItem] = useState({
    fk_id_produto: null,
    quantidade: 1,
    preco_unitario: 0
  });

  const [itensPedido, setItensPedido] = useState([]);




    useEffect(() => {
        const fetchProduto= async () => {
          try {
            const response = await axios.get("http://localhost:8800/books");
            setProduto(response.data);
          } catch (err) {
            console.log(err);
          }
        };
        
        const fetchCliente= async () => {
          try {
            const response = await axios.get("http://localhost:8800/cliente");
            setCliente(response.data);
          } catch (err) {
            console.log(err);
          }
        };


        fetchProduto();
        fetchCliente();
      }, []);



      const handleChange = (e) => {
        setPedido((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

      const handleItemChange = (e) => {
        setNovoItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
      const handleAdicionarItem = () => {
        const produtoSelecionado = produto.find(
          (p) => p.id_produto === parseInt(novoItem.fk_id_produto)
        );
        if (produtoSelecionado) {
          const itemAdicionado = {
            ...novoItem,
            nome: produtoSelecionado.nome,
            preco_unitario: produtoSelecionado.preco_unitario,
          };
    
          setItensPedido((prev) => [...prev, itemAdicionado]);
        }
      };





  return (
    <div>
      <div className="form">
        <h1>Novo Pedido</h1>
        <p> Produto: </p>  
        <div>
      <div className="form">
        <h1>Novo Pedido</h1>

        <p> Produto: </p>  
        <select
          name="fk_id_produto"
          value={novoItem.fk_id_produto}
          onChange={handleItemChange}
        >
          <option value="">Selecione um produto</option>
          {produto.map((produto) => (
            <option key={produto.id_produto} value={produto.id_produto}>
              {produto.nome}
            </option>
          ))}
        </select>

        <button onClick={handleAdicionarItem}>Adicionar Produto</button>

        <h2>Itens do Pedido</h2>
        <ul>
          {itensPedido.map((item, index) => (
            <li key={index}>
              {item.nome} - R${item.preco_unitario}
              <input
                type="number"
                value={item.quantidade}
                min="1"
                onChange={(e) => {
                  const updatedItens = [...itensPedido];
                  updatedItens[index].quantidade = e.target.value;
                  setItensPedido(updatedItens);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
        <input
          type="text"
          placeholder="Nome"
          name="nome"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="descricao"
          name="descricao"
          onChange={handleChange}
        />


        <input
          type="number"
          placeholder="preco_unitario"
          name="preco_unitario"
          onChange={handleChange}
        />

        <button >add</button>
      </div>
    </div>
  )
}

export default Pedido