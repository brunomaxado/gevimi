import React from 'react';
import '../modal.css'; // Importa o arquivo de estilo

const ModalHelpPainelEntregas = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Ajuda na página de painel de entregas.</h2>
          <button className="custom-modal-close" onClick={onRequestClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <div>
            <div>
              <h5><b>Cadastrar pedido:</b></h5>
              <dl>
                <dt>Botão "novo pedido":</dt>
                <dd>- Clique no botão para ser redirecionado para a página de cadastrar novos pedidos.</dd>
              </dl>
            </div>

            <div>
              <h5><b>Pesquisar:</b></h5>
              <dl>
                <dt>Barra de pesquisa:</dt>
                <dd>-  Na caixa de pesquisa, é possível pesquisar o nome do cliente.</dd>
                <dt>Status:</dt>
                <dd>- É possível filtrar os pedidos por estado: finalizado(quando o pedido foi entregue),
                  em andamento(quando o pedido está sendo preparado ou em espera até o dia) ou
                  pendente(quando o pedido não foi entregue e está atrasado).</dd>
                <dt>Tipo:</dt>
                <dd>- É possível filtrar os pedidos por tipo: Entrega(quando os funcionários fazem a entrega),
                  Entrega Ifood(quando a entrega é feita por terceiros pelo aplicativo do Ifood),
                  Retirada(quando o cliente encomenda e retira na loja) e
                  comum(quando o cliente compra à pronta entrega sem necessidade de encomenda).</dd>
                <dt>Limpar filtro:</dt>
                <dd>- Retira os filtros e limpa a caixa de pesquisa.</dd>
              </dl>
            </div>

            <div>
              <h5><b>Gerenciar pedidos:</b></h5>
              <dl>
                <dt>Finalizar:</dt>
                <dd>- Clique no ícone para finalizar o pedido.</dd>
                <dt>Visualizar:</dt>
                <dd>- Clique no ícone para visualizar todas as informações do pedido.</dd>
                <dt>Ícone de deletar (lixeira):</dt>
                <dd>- Clique no ícone para deletar o pedido,
                  só é possível deletar pedido se ele não estiver finalizado.</dd>
              </dl>
            </div>
          </div>
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

export default ModalHelpPainelEntregas;
