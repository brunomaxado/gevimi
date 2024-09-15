import axios from "axios";
import React, { useState, useEffect,useContext } from "react";
import ModalCliente from "../components/modalCliente";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const calcularPrecoTotal = (itens) => {
  return itens.reduce((total, item) => {
    return total + item.preco_unitario * item.quantidade;
  }, 0);
};

const Pedido = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [produto, setProduto] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);
  const navigate = useNavigate();
  const [pedido, setPedido] = useState({
    tipo: "",
    forma_pagamento: "",
    observacao: "",
    data_para_entregar: "",
    fk_id_usuario: currentUser?.id_usuario,
    fk_id_cliente: null,
  });

  const [novoItem, setNovoItem] = useState({
    fk_id_produto: "",
    quantidade: 1,
    preco_unitario: 0,
  });

  const [itensPedido, setItensPedido] = useState([]);
  const [tipoEntrega, setTipoEntrega] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Para a mensagem de sucesso

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axios.get("http://localhost:8800/books");
        setProduto(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCliente = async () => {
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
  useEffect(() => {
    setPrecoTotal(calcularPrecoTotal(itensPedido));
  }, [itensPedido]); // Dependência: quando itensPedido mudar, recalcula o preço total

  const handleItemChange = (e) => {
    setNovoItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const dadosParaAtualizar = {
      pedido,
      itensPedido
    };
    try {
      await axios.post("http://localhost:8800/pedido", dadosParaAtualizar);
      console.log("EXECUTEI");
      navigate("/pedido");
    } catch (err) {
      console.log(err);
      //setError(true);
    }
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

      setNovoItem((prev) => ({
        ...prev,
        fk_id_produto: "",
      }));
    }
  };

  const handleRemoverItem = (index) => {
    setItensPedido((prev) => prev.filter((_, i) => i !== index));
  };

 
  // Função para adicionar o cliente e fechar o modal
// Função para adicionar o cliente e fechar o modal
const adicionarCliente = async (novoCliente) => {
  try {
    // Atualiza a lista de clientes com o novo cliente
    const response = await axios.get("http://localhost:8800/cliente");
    setCliente(response.data);

    // Seleciona o novo cliente
    setPedido((prev) => ({
      ...prev,
      fk_id_cliente: novoCliente.id_cliente,
    }));

    // Mensagem de sucesso
    setSuccessMessage("Cliente cadastrado com sucesso!");

    // Fecha o modal
    setShowModal(false);

    // Remove a mensagem de sucesso após 3 segundos
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  } catch (err) {
    console.log("Erro ao atualizar a lista de clientes:", err);
  }
};

console.log(pedido);
console.log(novoItem);
console.log(itensPedido);
console.log(precoTotal);

  return (
    <div>
      <div className="form">
        <h1>Novo Pedido</h1>

        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>} {/* Mensagem de sucesso */}

        <p>Produto:</p>
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
              <button onClick={() => handleRemoverItem(index)}>Remover</button>
            </li>
          ))}
        </ul>
        <p>Preço Total: R${precoTotal}</p>
        <p>Tipo de Entrega:</p>
        <select
          name="tipo"
          id="tipo_entrega"
          value={pedido.tipo}
          onChange={(e) => {
            setTipoEntrega(e.target.value);
            handleChange(e);
          }}
        >
          <option value="">Selecione um tipo de entrega</option>
          <option value="entrega">Entrega</option>
          <option value="entrega_ifood">Entrega Ifood</option>
          <option value="retirada">Retirada</option>
        </select>

        {tipoEntrega === "entrega" || tipoEntrega === "entrega_ifood" ? (
          <div>
            <label>Data e Hora da Entrega:</label>
            <input
              type="datetime-local"
              placeholder="Data da Entrega"
              name="data_para_entregar"
              value={pedido.data_para_entregar}
              onChange={handleChange}
            />
          </div>
        ) : null}

<div>
<p>Cliente:</p>
<select
  name="fk_id_cliente"
  value={pedido.fk_id_cliente || ""} // Certifica-se de que o cliente novo está selecionado
  onChange={handleChange} // Atualiza o estado quando o usuário seleciona um cliente diferente
>
  <option value="">Selecione o cliente</option>
  {cliente.map((cliente) => (
    <option key={cliente.id_cliente} value={cliente.id_cliente}>
      {cliente.nome}
    </option>
  ))}
</select>

      <div className="form">
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        {/* Restante do código omitido por brevidade */}

        <p>
          Cliente não cadastrado?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setShowModal(true)}
          >
            Cadastre aqui!
          </span>
        </p>

        {/* Exibir o modal quando `showModal` for true */}
        {showModal && (
          <ModalCliente
            onClose={() => setShowModal(false)}
            adicionarCliente={adicionarCliente} // Passa a função para adicionar o cliente
          />
        )}
      </div>
    </div>
        <p>Forma de Pagamento:</p>
        <select
          name="forma_pagamento"
          id="forma_pagamento"
          value={pedido.forma_pagamento}
          onChange={handleChange}
        >
          <option value="">Selecione a forma de pagamento</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="pix">Pix</option>
          <option value="debito">Débito</option>
          <option value="credito">Crédito</option>
        </select>

        <input
          type="text"
          placeholder="Observação"
          name="observacao"
          value={pedido.observacao}
          onChange={handleChange}
        />

        <button onClick={handleClick}>Adicionar Pedido</button>
      </div>

     
    </div>
  );
};

export default Pedido;
