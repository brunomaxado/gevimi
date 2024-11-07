import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import ModalCliente from "../components/modalCliente";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import More from '@mui/icons-material/Add';


const Pedido = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [produto, setProduto] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);
  const [precoTotalFrete, setPrecoTotalFrete] = useState(0);
  const navigate = useNavigate();
  
  const [error, setError] = useState(null);
  const [pedido, setPedido] = useState({
    tipo: "", // Inicialize com uma string vazia, não null
    forma_pagamento: "",
    observacao: "",
    data_para_entregar: "",
    frete: null,
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

  const calcularPrecoTotal = (itens) => {
    return itens.reduce((total, item) => {
      return total + (item.preco_unitario * item.quantidade) ;
    }, 0);
  };
  const calcularPrecoTotalComFrete = (itens, frete) => {
    const totalItens = itens.reduce((total, item) => {
        return total + (item.preco_unitario * item.quantidade);
    }, 0);
    
    // Ensure frete is treated as a number, using parseFloat or Number
    const freteNumerico = parseFloat(frete) || 0; // Use 0 if frete is not a valid number
    return totalItens + freteNumerico; // Add the numeric freight cost
};

// Assuming pedido is available in your component
useEffect(() => {
    if (pedido) { // Ensure pedido is defined before accessing frete
        setPrecoTotalFrete(calcularPrecoTotalComFrete(itensPedido, pedido.frete));
    }
}, [itensPedido, pedido]); // Added pedido as a dependency


  useEffect(() => {
    setPrecoTotal(calcularPrecoTotal(itensPedido));
  }, [itensPedido]); // Dependência: quando itensPedido mudar, recalcula o preço total











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

  const handleItemChange = (e) => {
    setNovoItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  
const handleClick = async (e) => {
  e.preventDefault();

  // Verifica se todos os campos obrigatórios estão preenchidos
  const { tipo, forma_pagamento, data_para_entregar, fk_id_cliente } = pedido;
//
  if (!tipo || !forma_pagamento ||  !fk_id_cliente || (tipo !== "4" && !data_para_entregar)) {
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
  
const  handleAdicionarItem = async (e) => {
  e.preventDefault();
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

  const adicionarCliente = async (novoCliente) => {
    try {
      const response = await axios.get("http://localhost:8800/cliente");
      setCliente(response.data);

      setPedido((prev) => ({
        ...prev,
        fk_id_cliente: novoCliente.id_cliente,
      }));

      setSuccessMessage("Cliente cadastrado com sucesso!");

      setShowModal(false);

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
      navigate("/readPedido");
    }, 1500);
  };
// Função para formatar valores em formato de moeda
const formatarPreco = (valor) => {
  if (!valor) return "";
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

// Função para lidar com a máscara de frete
const formatarPrecoVisual = (valor) => {
  if (!valor) return "";
  return "R$ " + Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Função para lidar com o valor do frete como número
const handleFreteChange = (e) => {
  let valorDigitado = e.target.value;

  // Remover todos os caracteres não numéricos
  valorDigitado = valorDigitado.replace(/\D/g, "");

  // Atualizar o estado `pedido` com o valor numérico do frete
  setPedido((prev) => ({
    ...prev,
    frete: parseFloat(valorDigitado) / 100, // Armazena como número para cálculos
  }));
};

  const primeiroCampoRef = useRef(null);


  useEffect(() => {
    // Quando o componente for montado, o campo recebe o foco
    if (primeiroCampoRef.current) {
      primeiroCampoRef.current.focus();
    }
  }, [])



  console.log(pedido);
  console.log(novoItem);
  console.log(itensPedido);
  console.log(precoTotal);
  return (
    <div>
      
      <h1>NOVO PEDIDO</h1>
      
      <form className="form-container-pedido">
     <div className="form-esquerda-pedido">
        <div className="form-row-pedido">
          <div className="form-group-pedido">
            <label> Tipo: <span className="asterisco">*</span> </label>
            <select
              name="tipo"
              required
              value={pedido.tipo}
              onChange={(e) => {
                handleChange(e);
              }}
            >
              <option value="" disabled selected>Selecione um tipo de entrega</option>
              <option value="1">1. Entrega</option>
              <option value="2">2. Entrega Ifood</option>
              <option value="3">3. Retirada</option>
              <option value="4">4. Comum</option>
            </select>
          </div>
        </div>
        
        {(pedido.tipo === "1" || pedido.tipo === "2") && (
          <div className="form-row-pedido">
            <div className="form-group-pedido">
              <label> Data Retirada/Entrega: <span className="asterisco">*</span> </label>
              <input
                type="datetime-local"
                
                name="data_para_entregar"
                value={pedido.data_para_entregar}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group-pedido">
              <label> Frete: <span className="asterisco">*</span> </label>
              <input
  type="text"
  placeholder="Frete"
  name="frete"
  value={formatarPrecoVisual(pedido.frete)} // Exibe o valor formatado com "R$"
  onChange={handleFreteChange}
/>
            </div>
          </div>
        )}
              {(pedido.tipo === "3") && (
          <div className="form-row-pedido">
            <div className="form-group-pedido">
              <label> Data Retirada/Entrega: <span className="asterisco">*</span> </label>
              <input
                type="datetime-local"
                
                name="data_para_entregar"
                value={pedido.data_para_entregar}
                onChange={handleChange}
              />
            </div>
        
          </div>
        )}
        <div className="form-row-pedido">
          <div className="form-group-pedido">
            
              <label> Cliente: <span className="asterisco">*</span> </label>
            
          
            
              <select
  name="fk_id_cliente"
  value={pedido.fk_id_cliente || ""}
  onChange={handleChange}
  required
>
  <option value="" disabled>Selecione o cliente</option>
  {cliente.map((cliente) => (
    <option key={cliente.id_cliente} value={cliente.id_cliente}>
      {cliente.nome}
    </option>
  ))}
</select>

</div>

       
          <div className="form-group-pedido">
            <label> Forma Pagamento: <span className="asterisco">*</span> </label>
            <select
              name="forma_pagamento"
              required
              id="forma_pagamento"
              value={pedido.forma_pagamento}
              onChange={handleChange}
            >
              <option value="">Forma de pagamento</option>
              <option value="1">Dinheiro</option>
              <option value="2">Pix</option>
              <option value="3">Débito</option>
              <option value="4">Crédito</option>
            </select>
          </div>
          
        </div>
        <label> Observação: </label>
            <input
              type="text"
              placeholder="Observação"
              name="observacao"
              value={pedido.observacao}
              onChange={handleChange}
            />

        </div>
        <div className="form-direita-pedido">
  <div className="form-row-pedido">
    <div className="form-group-pedido">
      <label> Produto: <span className="asterisco">*</span> </label>
      <select
        name="fk_id_produto"
        ref={primeiroCampoRef}
        value={novoItem.fk_id_produto}
        onChange={handleItemChange}
        required
      >
        <option value="" disabled selected>Selecione um produto</option>
        {produto.map((produto) => (
          <option key={produto.id_produto} value={produto.id_produto}>
            {produto.nome}
          </option>
        ))}
      </select>
    </div>
    <button className="adicionar-produto-pedido" onClick={handleAdicionarItem}>
      <More /> {/* Adicionando o ícone More */}
    </button>
  </div>

  {/* Itens do Pedido com área de rolagem */}
  <h2 className="order-items-header">Itens do Pedido</h2>
  <div className="order-items-scrollable-container">
    {itensPedido.length === 0 ? (
      <p>Selecione um produto para inserir.</p>
    ) : (
      <ul className="order-items-list">
        {itensPedido.map((item, index) => (
          <li key={index} className="order-item">
            <span className="order-item-name">
              {item.nome} - R${item.preco_unitario * item.quantidade}
            </span>
            <div className="order-item-controls">
              <input
                type="number"
                className="order-item-quantity"
                value={item.quantidade}
                min="1"
                onChange={(e) => {
                  const updatedItens = [...itensPedido];
                  updatedItens[index].quantidade = e.target.value;
                  setItensPedido(updatedItens);
                }}
              />
              <p
                className="order-item-remove"
                onClick={() => handleRemoverItem(index)}
              >
                x
              </p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>






      </form>
      <div class="pricing-container">
  <div class="pricing-row">
    <h5 class="price">Preço Frete:</h5>
    <h5 class="price">R${pedido.frete}</h5>
  </div>
  <div class="pricing-row">
    <h5 class="price">Preço Parcial:</h5>
    <h5 class="price">R${precoTotal}</h5>
  </div>
  <div class="pricing-row total-pricing-row">
    <h5 class="label price-strong total-price">Preço Total:</h5>
    <h5 class="label price-strong total-price">R${precoTotalFrete}</h5> 
  </div>
</div>

{error && <p style={{ color: "red" }}>{error}</p>}

      <button class="enviar-pedido" onClick={handleClick}>Salvar</button>
  
       
      <ModalCliente
  isOpen={showModal}  // Controla se o modal deve ser exibido
  onRequestClose={() => setShowModal(false)}  // Função para fechar o modal
  adicionarCliente={adicionarCliente}  // Função para adicionar um cliente após cadastro
/>
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








