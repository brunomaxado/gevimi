import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import ModalCliente from "../components/modalCliente";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import More from "@mui/icons-material/Add";
import { useModified } from "../context/ModifiedContext";
import SearchIcon from '@mui/icons-material/InfoOutlined'; // Importando o ícone de pesquisa
import ReactTooltip, { Tooltip } from 'react-tooltip';
const Pedido = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { isModified, setIsModified } = useModified(); // Acessando o contexto
  const [produto, setProduto] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);
  const [precoTotalFrete, setPrecoTotalFrete] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [clienteSelecionado, setClienteSelecionado] = useState({});
const [showSairModal, setShowSairModal] =   useState(null);
  const [pedido, setPedido] = useState({
    tipo: "",
    forma_pagamento: "",
    observacao: "",
    data_para_entregar: "",
    frete: "",
    fk_id_usuario: currentUser?.id_usuario,
    fk_id_cliente: null,
  });

  console.log("isModified:", isModified);
  useEffect(() => {
    // Reseta isModified ao desmontar o componente
    return () => {
      setIsModified(false);
    };
  }, [setIsModified]);



  const handleConfirmExit = () => {
    navigate(-1);
    setShowSairModal(false); // Fecha o modal
  };
  
  const handleCancelExit = () => {
    setShowSairModal(false); // Fecha o modal sem realizar a ação
  };
  const [novoItem, setNovoItem] = useState({
    fk_id_produto: "",
    preco_unitario_atual: null,
    quantidade: 1,
    preco_unitario: 0,
  });

  const [itensPedido, setItensPedido] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFreteModal, setShowFreteModal] = useState(false);
  const primeiroCampoRef = useRef(null);

  const calcularPrecoTotal = (itens) => {
    const total = itens.reduce((total, item) => total + item.preco_unitario * item.quantidade, 0);

    // Formatar o total como moeda brasileira com 2 casas decimais
    return total.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const calcularPrecoTotalComFrete = (itens, frete) => {
    // Certifique-se de que 'calcularPrecoTotal' retorna um número, e não um valor formatado como moeda
    const totalItens = calcularPrecoTotal2(itens); // Espera um valor numérico, não uma string formatada
    
    // Converter o frete para número (caso seja uma string com valor numérico)
    const freteNumerico = parseFloat(frete) || 0;
  
    // Calcular o total com o frete
    const totalComFrete = totalItens + freteNumerico;
  
    // Formatar o total com frete como moeda brasileira
    return totalComFrete.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  
  // Função de cálculo do preço total (ajustando para garantir que o retorno seja numérico)
  const calcularPrecoTotal2 = (itens) => {
    return itens.reduce((acc, item) => acc + (item.preco_unitario_atual * item.quantidade), 0); 
  };
  


console.log(pedido);
  useEffect(() => {
    if (pedido) setPrecoTotalFrete(calcularPrecoTotalComFrete(itensPedido, pedido.frete));
  }, [itensPedido, pedido]);

  useEffect(() => {
    setPrecoTotal(calcularPrecoTotal(itensPedido));
  }, [itensPedido]);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axios.get("http://localhost:8800/readProduto");
        const produtosOrdenados = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setProduto(produtosOrdenados);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCliente = async () => {
      try {
        const response = await axios.get("http://localhost:8800/cliente");
        const clientesOrdenados = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setCliente(clientesOrdenados);
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
    setIsModified(true); // Marca o formulário como modificado
  };

  const handleItemChange = (e) => {
    setNovoItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsModified(true); // Marca o formulário como modificado
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { tipo, forma_pagamento, data_para_entregar, fk_id_cliente, frete } = pedido;

    if (!tipo || !forma_pagamento || !fk_id_cliente ) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }
    if ((tipo == 1 || tipo == 2) && (!data_para_entregar || !frete)) {
      console.log(tipo);
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }
    
    if (tipo == 3 && !data_para_entregar) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }
    
    if (itensPedido.length === 0) {
      setError("Adicione pelo menos um item ao pedido.");
      return;
    }
    if (fk_id_cliente == 1 && (tipo == 1 || tipo == 2)) {
      setError("Cliente 'A Loja' só pode ser utilizado para vendas comuns e Ifood. Entregas e Retiradas necessitam de cadastro");
      return;
    }
    setError(null);

    const dadosParaAtualizar = {
      pedido,
      itensPedido,
    };

    try {
      await axios.post("http://localhost:8800/pedido", dadosParaAtualizar);
      showSuccess("Pedido adicionado com sucesso");
    } catch (err) {
      console.log(err);
      setError("Ocorreu um erro ao adicionar o pedido.");
    }
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    if(isModified){
      setShowSairModal(true);
      return;
    }
    navigate(-1);

   // Navega para a página anterior
  };
  
  const handleAdicionarItem = async (e) => {
    e.preventDefault();
    const produtoSelecionado = produto.find(
      (p) => p.id_produto === parseInt(novoItem.fk_id_produto)
    );

    if (produtoSelecionado) {
      const itemExistente = itensPedido.find(
        (item) => item.fk_id_produto === novoItem.fk_id_produto
      );

      if (itemExistente) {
        const itensAtualizados = itensPedido.map((item) =>
          item.fk_id_produto === novoItem.fk_id_produto
            ? { ...item, quantidade: parseInt(item.quantidade) + parseInt(novoItem.quantidade) }
            : item
        );
        setItensPedido(itensAtualizados);
      } else {
        const itemAdicionado = {
          ...novoItem,
          nome: produtoSelecionado.nome,
          preco_unitario: produtoSelecionado.preco_unitario,
          preco_unitario_atual: produtoSelecionado.preco_unitario,
        };

        setItensPedido((prev) => [...prev, itemAdicionado]);
      }

      setNovoItem({ fk_id_produto: "", quantidade: 1 });
    } else {
      console.log("Nenhum produto encontrado para o ID:", novoItem.fk_id_produto);
    }
  };
  const handleClienteChange = (e) => {
    const { value } = e.target;
    setPedido((prev) => ({ ...prev, fk_id_cliente: value }));
    setIsModified(true); // Marca o formulário como modificado
    // Buscar os dados do cliente pelo ID selecionado
    const clienteEncontrado = cliente.find((c) => c.id_cliente === parseInt(value));
    if (clienteEncontrado) {
      setClienteSelecionado(clienteEncontrado);
    } else {
      setClienteSelecionado({});
    }
  };

  const handleRemoverItem = (index) => {
    setItensPedido((prev) => prev.filter((_, i) => i !== index));
  };

  const adicionarCliente = async (novoCliente) => {
    try {
      const response = await axios.get("http://localhost:8800/cliente");
      setCliente(response.data);
      setPedido((prev) => ({ ...prev, fk_id_cliente: novoCliente.id_cliente }));
      setSuccessMessage("Cliente cadastrado com sucesso!");
      setShowModal(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.log("Erro ao atualizar a lista de clientes:", err);
    }
  };
  function formatarMoedas(str) {
    // Divide a string em um array de números separados por vírgulas
    const numeros = str.split(',');

    // Seleciona os 3 primeiros números e formata no padrão brasileiro
    const formatados = numeros.slice(0, 3).map(numero => {
      // Remove espaços extras e converte para float
      const valor = parseFloat(numero.trim());

      // Formata no estilo de moeda brasileira
      return `R$ ${valor.toFixed(2).replace('.', ',')}`;
    });

    // Junta os valores formatados com o separador " | "
    return formatados.join(' | ');
  }
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/readPedido");
    }, 1500);
  };

  const formatarPrecoVisual = (valor) => {
    if (!valor) return "";
    return "R$ " + parseFloat(valor).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleFreteChange = (e) => {
    let valorDigitado = e.target.value.replace(/\D/g, "");
    setPedido((prev) => ({ ...prev, frete: parseFloat(valorDigitado) / 100 }));
  };

  useEffect(() => {
    if (primeiroCampoRef.current) {
      primeiroCampoRef.current.focus();
    }
  }, []);

  const handleClose = () => {
    setShowFreteModal(false);
  };
  const handleMap = () => {
    // Endereço de origem padrão
    const origemPadrao = "Ponta Grossa, Uvaranas, Rua Marquês de Sapucaí, 227";

    // Endereço de destino, baseado no cliente selecionado
    const enderecoDestino = `${clienteSelecionado.cidade}, ${clienteSelecionado.bairro}, ${clienteSelecionado.cep}, ${clienteSelecionado.logradouro}, ${clienteSelecionado.numero}`;

    // Cria a URL do Google Maps com origem e destino
    const googleMapsURL = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origemPadrao)}&destination=${encodeURIComponent(enderecoDestino)}&travelmode=driving`;

    // Abre a URL em uma nova guia
    window.open(googleMapsURL, '_blank');
  };


  const formatarFrete = (frete) => {
    const freteNumerico = parseFloat(frete) || 0;  // Garantir que o valor seja numérico
    return freteNumerico.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div>

      <h1>Novo Pedido</h1>

      <form className="form-container-pedido">
        <div className="form-esquerda-pedido">
          <div className="form-row-pedido">
            < div className="form-group-pedido">

              <label> Cliente: <span className="asterisco">*</span> </label>



              <select
                name="fk_id_cliente"
                value={pedido.fk_id_cliente || ""}
                onChange={handleClienteChange}
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
                <option value="4">Comum</option>
                <option value="1"> Entrega</option>
                <option value="2"> Entrega Ifood</option>
                <option value="3">Retirada</option>
              
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

                <label> <SearchIcon onClick={() => setShowFreteModal(true)} fontSize="small" className="search-icon" />   Frete: <span className="asterisco">*</span>    </label>

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
              <label> Forma Pagamento: <span className="asterisco">*</span> </label>
              <select
                name="forma_pagamento"
                required
                id="forma_pagamento"
                value={pedido.forma_pagamento}
                onChange={handleChange}
              >
                <option value="">Forma de pagamento</option>
                <option value="4">Crédito</option>
                <option value="3">Débito</option>
                <option value="1">Dinheiro</option>
                <option value="2">Pix</option>
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
          <p> <span className="asterisco">*</span> Os campos marcados com asterisco vermelho são obrigatórios. </p>
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
                      {item.nome} -{formatarFrete(item.preco_unitario * item.quantidade)}
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
          <h5 class="price">Preço Item Pedido:</h5>
          <h5 class="price">{precoTotal}</h5>
        </div>
        {(pedido.tipo == 1 || pedido.tipo == 2) &&
          <div class="pricing-row">
            <h5 class="price">Preço Frete:</h5>
            <h5 class="price">{formatarFrete(pedido.frete)}</h5>

          </div>}
        <div class="pricing-row total-pricing-row">
          <h5 class="label price-strong total-price">Preço Total:</h5>
          <h5 class="label price-strong total-price">{precoTotalFrete}</h5>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <button className="voltar" onClick={handleBackClick}> Voltar</button>
      <button class="enviar-pedido" onClick={handleClick}>Confirmar</button>
   
      {showSairModal &&
       
       
          <div className="modal">
            <div className="modal-content">
              <button className="close-modal" onClick={handleCancelExit}>X</button>
              <h2 style={{ textAlign: 'center' }}>Dados não salvos!</h2>
              <p style={{ textAlign: 'center' }}>Dados não salvos! Seus dados não serão salvos se não confirmar o envio.</p>
              <div className="modal-div">
                <button className="modal-button" onClick={handleConfirmExit}>Sair</button>
                <button className="modal-button" onClick={handleCancelExit}>Ficar</button>
              </div>
            </div>
          </div>
          
      }
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
      {showFreteModal && (
        <div className="modal">
          <div className="modal-content">
            {/* Botão para fechar o modal */}
            <button className="close-modal" onClick={handleClose}>X</button>

            {/* Cabeçalho do modal */}
            <h2>Endereço e Últimos Fretes</h2>


            <p onClick={handleMap} className="link-style">{`${clienteSelecionado.cidade}, ${clienteSelecionado.bairro}, ${clienteSelecionado.logradouro}, ${clienteSelecionado.numero}`}</p>
            <p>
              {clienteSelecionado.ultimos_fretes
                ? formatarMoedas(clienteSelecionado.ultimos_fretes)
                : "Sem últimos fretes"}
            </p>

            {/* Div adicional para conteúdo futuro */}
            <div className="modal-div">
              {/* Conteúdo adicional pode ser inserido aqui */}
            </div>
          </div>
        </div>
      )}



    </div>
  );


};

export default Pedido;

