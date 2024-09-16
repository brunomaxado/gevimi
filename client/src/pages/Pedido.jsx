import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
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
  const [error, setError] = useState(null);
  const [pedido, setPedido] = useState({
    tipo: "", // Inicialize com uma string vazia, não null
    forma_pagamento: "",
    observacao: "",
    data_para_entregar: "",
    fk_id_usuario: currentUser?.id_usuario,
    fk_id_cliente: null,
  });

  const [novoItem, setNovoItem] = useState({
    fk_id_produto: "",
    preco_unitario_atual: null,
    quantidade: 1,
    preco_unitario: 0,
  });

  const [itensPedido, setItensPedido] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Para a mensagem de sucesso
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  
  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axios.get("http://localhost:8800/readProduto");
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
    const { name, value } = e.target;
    setPedido((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setPrecoTotal(calcularPrecoTotal(itensPedido));
  }, [itensPedido]); // Dependência: quando itensPedido mudar, recalcula o preço total

  const handleItemChange = (e) => {
    setNovoItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  
const handleClick = async (e) => {
  e.preventDefault();

  // Verifica se todos os campos obrigatórios estão preenchidos
  const { tipo, forma_pagamento, data_para_entregar, fk_id_cliente } = pedido;

  if (!tipo || !forma_pagamento || ((tipo === "1" || tipo === "2") && !fk_id_cliente) || (tipo !== "3" && !data_para_entregar)) {
    setError("Todos os campos obrigatórios devem ser preenchidos.");
    return;
  }
  
  if (itensPedido.length === 0) {
    setError("Adicione pelo menos um item ao pedido.");
    return;
  }

  // Limpa a mensagem de erro antes de tentar submeter o pedido
  setError(null);

  const dadosParaAtualizar = {
    pedido,
    itensPedido, // Agora cada item contém o preco_unitario_atual correto
  };

  try {
    await axios.post("http://localhost:8800/pedido", dadosParaAtualizar);
    console.log("Pedido adicionado com sucesso");
    showSuccess("Pedido adicionado com sucesso");

  } catch (err) {
    console.log(err);
    setError("Ocorreu um erro ao adicionar o pedido.");
  }
};
  

const handleAdicionarItem = () => {
  const produtoSelecionado = produto.find(
    (p) => p.id_produto === parseInt(novoItem.fk_id_produto)
  );

  if (produtoSelecionado) {
    // Verifica se o produto já foi adicionado
    const itemExistente = itensPedido.find(
      (item) => item.fk_id_produto === novoItem.fk_id_produto
    );

    if (itemExistente) {
      // Se o produto já foi adicionado, incrementa a quantidade
      const itensAtualizados = itensPedido.map((item) =>
        item.fk_id_produto === novoItem.fk_id_produto
          ? { ...item, quantidade: parseInt(item.quantidade) + parseInt(novoItem.quantidade) }
          : item
      );
      setItensPedido(itensAtualizados);
    } else {
      // Se o produto ainda não foi adicionado, adiciona o novo item
      const itemAdicionado = {
        ...novoItem,
        nome: produtoSelecionado.nome,
        preco_unitario: produtoSelecionado.preco_unitario, // Preço do produto no momento da seleção
        preco_unitario_atual: produtoSelecionado.preco_unitario, // Salva o preço atual
      };

      setItensPedido((prev) => [...prev, itemAdicionado]);
    }

    setNovoItem((prev) => ({
      ...prev,
      fk_id_produto: "",
      quantidade: 1, // Reseta a quantidade para 1 após adicionar o produto
    }));
  } else {
    console.log("Nenhum produto encontrado para o ID:", novoItem.fk_id_produto);
  }
};



  const handleRemoverItem = (index) => {
    setItensPedido((prev) => prev.filter((_, i) => i !== index));
  };

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
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/readPedido"); // Redirecionar após 3 segundos
    }, 1500);
  };
  
  console.log(pedido);
  console.log(novoItem);
  console.log(itensPedido);
  console.log(precoTotal);

  return (
    <div>
      <div className="form" id="pedidos">
        <h1>Novo Pedido</h1>
      
        <p>Produto:</p>
        <p>
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
        </p>
        <p>
          <button onClick={handleAdicionarItem}>Adicionar Produto</button>
        </p>
        <h2>Itens do Pedido</h2>
        <ul>
          {itensPedido.map((item, index) => (
            <li key={index}>
             <p>{item.nome} - R${item.preco_unitario}</p>
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
              <p>
                <button onClick={() => handleRemoverItem(index)}>Remover</button>
              </p>
            </li>
          ))}
        </ul>
        <p>Preço Total: R${precoTotal}</p>
        <p>Tipo de Entrega:</p>
        <p>
          <select
            name="tipo"
            id="tipo_entrega"
            value={pedido.tipo}
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <option value="">Selecione um tipo de entrega</option>
            <option value="1">1. Entrega</option>
            <option value="2">2. Entrega Ifood</option>
            <option value="3">3. Retirada</option>
          </select>
        </p>

        {(pedido.tipo === "1" || pedido.tipo === "2") && (
          <div>
            <p>
              <label>Data e Hora da Entrega:</label>
            </p>
            <p>
              <input
                type="datetime-local"
                placeholder="Data da Entrega"
                name="data_para_entregar"
                value={pedido.data_para_entregar}
                onChange={handleChange}
              />
            </p>
          </div>
        )}

        <div>
          <p>Cliente:</p>
          <p>
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
          </p>

          <div className="form">
            {successMessage &&
              <p style={{ color: "green" }}>
                {successMessage}
              </p>}
            <p>
              Cliente não cadastrado?{" "}
              <span
                onClick={() => setShowModal(true)}
              >
                Cadastre aqui!
              </span>
            </p>

            {/* Exibir o modal quando showModal for true */}
            {showModal && (
              <ModalCliente
                onClose={() => setShowModal(false)}
                adicionarCliente={adicionarCliente} // Passa a função para adicionar o cliente
              />
            )}
          </div>
        </div>
        <p>Forma de Pagamento:</p>
        <p>
          <select
            name="forma_pagamento"
            id="forma_pagamento"
            value={pedido.forma_pagamento}
            onChange={handleChange}
          >
            <option value="">Selecione a forma de pagamento</option>
            <option value="1">Dinheiro</option>
            <option value="2">Pix</option>
            <option value="3">Débito</option>
            <option value="4">Crédito</option>
          </select>
        </p>
        <p>
          <input
            type="text"
            placeholder="Observação"
            name="observacao"
            value={pedido.observacao}
            onChange={handleChange}
          />
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          <button onClick={handleClick}>Adicionar Pedido</button>
        </p>
      </div>
      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <span>{successMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedido;