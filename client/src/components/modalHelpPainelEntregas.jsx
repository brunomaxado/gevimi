import React from 'react';
import '../modal.css'; // Importa o arquivo de estilo

const ModalHelpPainelEntregas = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Ajuda na página inicial.</h2>
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
              <h5><b>Menu lateral:</b></h5>
              <dl>

                <dd>- no menu lateral é possível escolher o que fazer.</dd>

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
