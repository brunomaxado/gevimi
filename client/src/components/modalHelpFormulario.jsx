import React from 'react';
import '../modal.css'; // Importa o arquivo de estilo

const ModalHelpFormulario = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Ajuda na página de gerar relatório de pedidos.</h2>
          <button className="custom-modal-close" onClick={onRequestClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <div>
            <h5><b>Gerar relatório de pedidos filtrar por datas:</b></h5>
            <dl>
            <dd>- É necessário escolher ao menos uma data inicial e uma final para gerar um relatório de um determinado período.</dd>
              <dt>Data de Realização inicial:</dt>
              <dd>- Escolha a data inicial ao qual o relatório retornará,
                 essa data refere-se ao dia ao qual o pedido foi realizado,
                 ele não pegará pedidos de datas anteriores à essa.</dd>
              <dt>Data de Realização final:</dt>
              <dd> - Escolha a data limite ao qual o relatório retornará, ele não pegará pedidos de datas posteriores a essa.</dd>
            </dl>
            <dl>
              <dt>Data de Finalizado inicial:</dt>
              <dd>- Escolha a data inicial ao qual o relatório retornará, 
                essa data refere-se ao dia ao qual o pedido foi finalizado,
                 ele não pegará pedidos de datas anteriores à essa.</dd>
              <dt>Data de Finalizado final:</dt>
              <dd> - Escolha a data limite ao qual o relatório retornará, ele não pegará pedidos de datas posteriores a essa.</dd>
            </dl>
            <dl>
              <dt>Data de Entrega inicial:</dt>
              <dd>- Escolha a data inicial ao qual o relatório retornará, 
                essa data refere-se ao dia ao qual o pedido foi entregue,
                 ele não pegará pedidos de datas anteriores à essa.</dd>
              <dt>Data de Entrega final:</dt>
              <dd> - Escolha a data limite ao qual o relatório retornará, ele não pegará pedidos de datas posteriores a essa.</dd>
            </dl>
          </div>

          <div>
            <h5><b>Filtros:</b></h5>
            <dl>
              <dt>Cliente:</dt>
              <dd>- Se optar por filtrar por clientes, é possível escolher mais de um dentre os listados e também
                digitar para encontrar mais facilmente.</dd>
              <dt>Usuário:</dt>
              <dd>- Se optar por filtrar por usuário, é possível escolher apenas um dentre os listados e também 
                digitar para encontrar mais facilmente.</dd>
              <dt>Produto:</dt>
              <dd>- Se optar por filtrar por produto, é possível escolher mais de um dentre os listados e também 
              digitar para encontrar mais facilmente..</dd>
              <dt>Status:</dt>
              <dd>- Se optar por filtrar por status de pedido, seja ele finalizado, pendente ou em produção,
                pode escolher nesse filtro apenas uma opção.</dd>
              <dt>Tipo do pedido:</dt>
              <dd>- Se optar por escolher tipo em que o pedido foi feito, seja por entrega padrão, entrega
                pelo aplicativo Ifood, apenas retirada e comum para itens à pronta entrega, é possível selecionar
                mais de uma opção.</dd>
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

export default ModalHelpFormulario;
