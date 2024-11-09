import React from 'react';
import '../modal.css'; // Importa o arquivo de estilo para o modal

const ModalHelpPedido = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Ajuda no cadastro de Pedidos</h2>
          <button className="custom-modal-close" onClick={onRequestClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <h5><b>Efetuar um cadastro de Pedido:</b></h5>
          <dl>
            <dt>Tipo:</dt>
            <dd>- Selecione o tipo correspondente:
              Entrega: se a entrega for feita pelos funcionários da loja;
              Entrega Ifood: se a entrega for feita por terceiros através do aplicativo Ifood;
              Retirada: se o cliente optar por retirar a encomenda na loja;
              Comum: se o cliente comparecer à loja para comprar os produtos disponíveis na loja sem encomendar.</dd>
            <dt>Frete:</dt>
            <dd>- Valor do frete se for uma entrega.</dd>
            <dt>Data de entrega:</dt>
            <dd>- Data prevista para a entrega.</dd>
            <dt>Cliente:</dt>
            <dd>- Selecione o cliente dentre os listados ou digite o nome.</dd>
            <dt>Forma de pagamento:</dt>
            <dd>- selecione a forma de pagamento que o cliente escolher.</dd>
           
            <dt>Produto:</dt>
            <dd>-Selecione os produtos e clique no botão ao lado para adicionar, a quantidade pode ser
              aumentada e/ou diminuída se necessário assim que adicionado.</dd>
            <dt>Itens do pedido:</dt>
            <dd>-Área onde os produtos ficarão listados.</dd>

            <dt>Observações:</dt>
            <dd>- Detalhes específicos sobre o pedido.</dd>
          </dl>
          <p>*Os campos marcados com asterisco vermelho são obrigatórios.</p>
          <dl>
            <dt>Botão Confirmar:</dt>
            <dd>
              Ao conferir e atestar que todos os dados estão corretos e os obrigatórios foram preenchidos,
              clique no botão "Confirmar". Se o cadastro for bem-sucedido, um pop-up verde aparecerá na parte
              superior da tela, indicando o sucesso. Caso contrário, aparecerá um aviso sobre o erro.
              Após sucesso, você será redirecionado para a lista de pedidos.
            </dd>
          </dl>
        </div>
        <div className="custom-modal-footer">
          <button className="custom-button-danger" onClick={onRequestClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalHelpPedido;
