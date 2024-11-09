import React from 'react';
import '../modal.css'; // Importa o arquivo de estilo

const ModalHelpAlterarSenha = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Ajuda na página de alterar senha de usuário.</h2>
          <button className="custom-modal-close" onClick={onRequestClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <div>
            <h5><b>Efetuar alteração de senha de usuário:</b></h5>
            <dl>
              <dt>Senha Antiga:</dt>
              <dd>- Digite a senha atual.</dd>
              <dt>Senha Nova:</dt>
              <dd>- Digite a nova senha.</dd>
              <dt>Botão Confirmar:</dt>
              <dd>
                - Assim que tiver certeza, aperte no botão confirmar e se for bem sucedido um pop-up 
                de sucesso será mostrado.
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

export default ModalHelpAlterarSenha;
