import React from 'react';
import '../modal.css'; // Importa o arquivo de estilo

const ModalHelpRelatorio = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Ajuda na página de gerar relatório de produtos.</h2>
          <button className="custom-modal-close" onClick={onRequestClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <div>
            <h5><b>Gerar relatório de produtos filtrar por datas:</b></h5>
            <dl>
            <dd>- É necessário escolher ao menos uma data inicial e uma final para gerar um relatório de um determinado período.</dd>
              <dt>Data início:</dt>
              <dd>- Escolha a data inicial ao qual o relatório retornará, ele não pegará produtos de datas anteriores à essa.</dd>
              <dt>Data fim:</dt>
              <dd> - Escolha a data limite ao qual o relatório retornará, ele não pegará produtos de datas posteriores a essa.</dd>
            </dl>
          </div>

          <div>
            <h5><b>Gerar relatório:</b></h5>
            <dl>
              <dt>Gerar relatório:</dt>
              <dd>- Para gerar um relatório, basta clicar no botão de gerar relatório, se tiver escolhido uma opção de
                filtro mas não quiser mais utilizar, basta usar o botão "limpar filtros" que eles serão recolocados
                para vazios.</dd>
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

export default ModalHelpRelatorio;
