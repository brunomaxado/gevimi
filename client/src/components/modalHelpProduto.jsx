import React from 'react';
import '../modal.css'; // Certifique-se de que o CSS esteja no caminho correto

const HelpProduto = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null; // Não renderiza nada se o modal não estiver aberto

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Ajuda no cadastro de Produto</h2>
          <button className="custom-modal-close" onClick={onRequestClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <h5><b>Efetuar um cadastro de Produto:</b></h5>
          <div className="modal-body-content">
            <dl>
              <dt>Nome:</dt>
              <dd>- Nome do produto.</dd>
              <dt>Descrição:</dt>
              <dd>- Descrição do produto como ingredientes e produtos alergênicos.</dd>
              <dt>Preço unitário:</dt>
              <dd>- Valor do produto por unidade.</dd>
              <dt>Categoria:</dt>
              <dd>- Selecionar a categoria dentre as já cadastradas.</dd>
            </dl>
            <p>*Os campos marcados com asterisco vermelho são obrigatórios (Nome, preço unitário e categoria).</p>
            <dl>
              <dt>Botão Confirmar:</dt>
              <dd>
                - Ao conferir e atestar que todos os dados estão de acordo e os campos obrigatórios foram preenchidos, deve-se clicar no botão "Confirmar". Se o cadastro for bem-sucedido, um pop-up verde claro aparecerá na parte superior da tela informando que foi bem-sucedido. Caso contrário, o pop-up será vermelho, indicando que não foi possível. Se bem-sucedido, você será redirecionado para a lista de todos os produtos cadastrados.
              </dd>
            </dl>
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

export default HelpProduto;
