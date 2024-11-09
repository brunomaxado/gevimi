import React from 'react';
import '../modal.css'; // Importa o arquivo de estilo

const ModalHelpNovoUsuario = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Ajuda na página de cadastrar usuário.</h2>
          <button className="custom-modal-close" onClick={onRequestClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <div>
            <h5><b>Cadastrar novo usuário:</b></h5>
            <dl>
              <dt>Nome:</dt>
              <dd>- Digite o nome do usuário, pode ser o primeiro nome e as iniciais.</dd>
              <dt>Login:</dt>
              <dd>- Digite o primeiro nome do usuário, ele usará esse nome para entrar no sistema.</dd>
              <dt>Senha:</dt>
              <dd>- Digite a senha para esse usuário, pode incluir letras e números por exemplo.</dd>
              <dt>Administrador:</dt>
              <dd>- Defina as permissões desse usuário, se for administrador ele poderá gerenciar outros
                usuários.
              </dd>
              <dt>Botão Confirmar:</dt>
              <dd>
              - Ao conferir os dados e entender que estão corretos, deve-se clicar no botão "Confirmar".
                 Assim, se o cadastro foi bem-sucedido, um pop-up verde claro aparecerá na parte superior
                  da tela avisando que foi bem-sucedido, caso contrário, um aviso indicando que não foi possível
                  aparecerá. Se bem-sucedido, será redirecionado para a lista de todas os usuários cadastrados.
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

export default ModalHelpNovoUsuario;
