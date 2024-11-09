import React from 'react';
import '../modal.css'; // Importa o arquivo de estilo

const ModalHelpReadProduto = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Ajuda na página de listar todos os produtos.</h2>
          <button className="custom-modal-close" onClick={onRequestClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <div>
            <h5><b>Pesquisar:</b></h5>
            <dl>
              <dt>Caixa de pesquisa:</dt>
              <dd>- Pesquise um produto por seu nome.</dd>
              <dt>Filtrar por categoria:</dt>
              <dd>
                - Veja todos os produtos de uma categoria específica ao selecionar no filtro.
              </dd>
              <dt>Limpar filtros:</dt>
              <dd>
                - Limpe os resultados de pesquisa e filtros.
              </dd>
            </dl>
          </div>

          <div>
            <h5><b>Novo produto:</b></h5>
            <dl>
              <dt>Cadastrar produto:</dt>
              <dd>- Clique no botão "novo produto" para ser redirecionado para a página de cadastro de produtos.</dd>
            </dl>
          </div>

          <div>
            <h5><b>Deletar produto:</b></h5>
            <dl>
              <dt>Ícone de deletar (lixeira):</dt>
              <dd>- Clique no ícone para deletar o produto,
                 só é possível deletar produto se ele não estiver associado
                  à algum pedido.</dd>
            </dl>
          </div>

          <div>
            <h5><b>Editar produto:</b></h5>
            <dl>
              <dt>Ícone de edição (lápis):</dt>
              <dd>- Clique no ícone para editar o nome, preço, categoria e descrição.</dd>
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

export default ModalHelpReadProduto;
