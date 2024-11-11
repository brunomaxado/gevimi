import React from 'react';
import '../modal.css'; // Importa o arquivo de estilo

const ModalHelpFormulario = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Ajuda na página de gerar formulário de pedidos.</h2>
          <button className="custom-modal-close" onClick={onRequestClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <div>
            <h5><b>Gerar formulário de pedidos:</b></h5>
            <dl>
              <dt>Data início:</dt>
              <dd>- Escolha a data inicial ao qual o relatório retornará, ele não pegará pedidos de datas anteriores à essa.</dd>
              <dt>Data final:</dt>
              <dd> - Escolha a data limite ao qual o relatório retornará, ele não pegará pedidos de datas posteriores a essa.</dd>
            </dl>
          </div>

          <div>
            <h5><b>Filtros:</b></h5>
            <dl>
              <dt>Status:</dt>
              <dd>- Se optar por filtrar por status de pedido, seja ele finalizado, pendente ou em andamento,
                pode escolher nesse filtro apenas uma opção.</dd>
              <dt>Situação do pedido:</dt>
              <dd>- Se optar por escolher a situação em que o pedido foi feito, seja por entrega padrão, entrega
                pelo aplicativo Ifood, apenas retirada e comum para itens à pronta entrega, é possível selecionar
                uma das opções.</dd>
            </dl>
          </div>

          <div>
            <h5><b>Gerar relatório:</b></h5>
            <dl>
              <dt>Gerar relatório:</dt>
              <dd>- Para gerar um relatório, basta clicar no botão de gerar relatório, se tiver escolhido uma opção de 
                filtro mas não quiser mais utilizar, basta usar o botão "limpar filtros" que eles serão recolocados
                para a geração padrão do início do mês até o início do mês seguinte.</dd>
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

export default ModalHelpFormulario;
