import React from 'react';
import '../modal.css'; // Importa o arquivo de estilo

const ModalHelpCategoria = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Ajuda na página de categoria</h2>
          <button className="custom-modal-close" onClick={onRequestClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <div>
            <h5><b>Efetuar cadastro de categoria:</b></h5>
            <dl>
              <dt>Nome:</dt>
              <dd>- Nome da categoria.</dd>
              <dt>Botão Confirmar:</dt>
              <dd>
                - Ao conferir o nome correto à categoria, deve-se clicar no botão "Confirmar".
                 Assim, se o cadastro foi bem-sucedido, um pop-up verde claro aparecerá na parte superior
                  da tela avisando que foi bem-sucedido, caso contrário, um aviso indicando que não foi possível
                  aparecerá. Se bem-sucedido, será redirecionado para a lista de todas as categorias cadastradas.
              </dd>
            </dl>
          </div>

          <div>
            <h5><b>Pesquisar categoria:</b></h5>
            <dl>
              <dt>Barra de pesquisa:</dt>
              <dd>- Na caixa de pesquisa, é possível pesquisar o nome da categoria.</dd>
              <dt>Limpar filtros:</dt>
              <dd>- Clique para apagar mais rápido a pesquisa.</dd>
            </dl>
          </div>

          <div>
            <h5><b>Editar categoria:</b></h5>
            <dl>
              <dt>Ícone de edição (lápis):</dt>
              <dd>- Clique no ícone para editar o nome da categoria.</dd>
            </dl>
          </div>

          <div>
            <h5><b>Deletar categoria:</b></h5>
            <dl>
              <dt>Ícone de deletar (lixeira):</dt>
              <dd>- Clique no ícone para deletar a categoria,
                 só é possível deletar categoria se ela não estiver associada
                  à algum produto.</dd>
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

export default ModalHelpCategoria;
