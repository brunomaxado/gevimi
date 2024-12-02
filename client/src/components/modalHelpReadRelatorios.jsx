import React from 'react';
import '../modal.css'; // Importa o arquivo de estilo

const ModalHelpRelatorios = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Ajuda na página Relatórios.</h2>
          <button className="custom-modal-close" onClick={onRequestClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <div>
            <h5><b>Gerar relatório de produtos:</b></h5>
            <dl>
            <dd>-Para gerar um relatório de produtos, clique em "Relatório de produtos", você será redirecionado
                para a página de geração de relatório de produtos.</dd>
             </dl>
             <h5><b>Gerar relatório de pedidos:</b></h5>
            <dl>
            <dd>-Para gerar um relatório de pedidos, clique em "Relatório de pedidos", você será redirecionado
                para a página de geração de relatório de pedidos.</dd>
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

export default ModalHelpRelatorios;
