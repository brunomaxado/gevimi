import React from 'react';
import '../modal.css'; // Importa o arquivo de estilo

const ModalHelpReadUsuarios = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Ajuda na página de listar todos os usuários.</h2>
          <button className="custom-modal-close" onClick={onRequestClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <div>
            <h5><b>Pesquisar:</b></h5>
            <dl>
              <dt>Barra de pesquisa:</dt>
              <dd>- Na caixa de pesquisa, é possível pesquisar o nome da categoria.</dd>
              <dt>Limpar filtros:</dt>
              <dd>
                - Clique para apagar a caixa de pesquisa.
              </dd>
            </dl>
          </div>
          <div>
            <h5><b>Cadastrar usuário:</b></h5>
            <dl>
              <dt>Novo usuário:</dt>
              <dd>- Para cadastrar um novo usuário, clique no botão "novo usuário"
                e será redirecionado para a página de cadastrar usuário.</dd>
            </dl>
          </div>
          <div>
            <h5><b>Editar Usuário:</b></h5>
            <dl>
              <dt>Ícone de edição (lápis):</dt>
              <dd>- Clique no ícone para editar nome, login, permissões de administrador
                e/ou senha.</dd>
            </dl>
          </div>
          <div>
            <h5><b>Deletar Usuário:</b></h5>
            <dl>
              <dt>Ícone de deletar (lixeira):</dt>
              <dd>- Clique no ícone para deletar usuário, desde que ele não esteja associado
                à pedidos.</dd>
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

export default ModalHelpReadUsuarios;
