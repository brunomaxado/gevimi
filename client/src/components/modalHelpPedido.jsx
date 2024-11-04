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
            <dt>Nome:</dt>
            <dd>- Nome do cliente para o pedido.</dd>
            <dt>CPF:</dt>
            <dd>- CPF do cliente, deve ser válido.</dd>
            <dt>Celular:</dt>
            <dd>- Número de telefone para contato.</dd>
            <dt>CEP:</dt>
            <dd>- CEP do endereço de entrega.</dd>
            <dt>Logradouro:</dt>
            <dd>- Endereço completo.</dd>
            <dt>Número:</dt>
            <dd>- Número do endereço.</dd>
            <dt>Complemento:</dt>
            <dd>- Informações adicionais de endereço, se houver.</dd>
            <dt>Observações:</dt>
            <dd>- Detalhes específicos sobre o pedido.</dd>
          </dl>
          <p>*Os campos marcados com asterisco vermelho são obrigatórios. (Nome, CPF, Celular, CEP e Número).</p>
          <dl>
            <dt>Botão Confirmar:</dt>
            <dd>
              Ao conferir e atestar que todos os dados estão corretos e os obrigatórios foram preenchidos,
              clique no botão "Confirmar". Se o cadastro for bem-sucedido, um pop-up verde aparecerá na parte
              superior da tela, indicando o sucesso. Caso contrário, o pop-up será vermelho, avisando sobre o erro.
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
