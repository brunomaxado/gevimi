import React from 'react';
import '../modal.css'; // Importa o arquivo de estilo

const ModalHelpReadCliente = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Ajuda na página de listar todos os clientes.</h2>
          <button className="custom-modal-close" onClick={onRequestClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <div>
          <div>
            <h5><b>Cadastrar cliente:</b></h5>
            <dl>
              <dt>Botão "novo cliente":</dt>
              <dd>- Clique no botão para ser redirecionado para a página de cadastrar novos clientes.</dd>
            </dl>
          </div>

          <div>
            <h5><b>Pesquisar:</b></h5>
            <dl>
              <dt>Barra de pesquisa:</dt>
              <dd>-  Na caixa de pesquisa, é possível pesquisar o nome, cpf, cep, celular e endereço do cliente.</dd>
              <dt>Limpar filtro:</dt>
              <dd>- Limpa a caixa de pesquisa.</dd>
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

export default ModalHelpReadCliente;
