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
            <h5><b>:</b></h5>
            <dl>
              <dt>:</dt>
              <dd>- </dd>
              <dt>Botão Confirmar:</dt>
              <dd>

              </dd>
            </dl>
          </div>

          <div>
            <h5><b>:</b></h5>
            <dl>
              <dt>:</dt>
              <dd>- .</dd>
              <dt>:</dt>
              <dd>- .</dd>
            </dl>
          </div>

          <div>
            <h5><b>:</b></h5>
            <dl>
              <dt>:</dt>
              <dd>- .</dd>
            </dl>
          </div>

          <div>
            <h5><b>:</b></h5>
            <dl>
              <dt>:</dt>
              <dd>- .</dd>
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

export default ModalHelpReadCliente;
