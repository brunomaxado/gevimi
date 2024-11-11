import React from 'react';
import '../modal.css'; // Importa o arquivo de estilo

const ModalHelpEstatisticas = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Ajuda na página de estatísticas.</h2>
          <button className="custom-modal-close" onClick={onRequestClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <div>
            <h5><b>Verificar estatísticas dentro do espaço de tempo:</b></h5>
            <dl>
              <dt>Data de início:</dt>
              <dd>- Escolha a data de início, as estatísticas iniciarão a partir desse dia, datas anteriores 
                a essa escolha não serão incluídas nas estatísticas.</dd>
              <dt>Data de fim:</dt>
              <dd>
                - Escolha a data final, datas após essa escolha não serão incluídas nas estatísticas.
              </dd>
              <dt>Filtrar por data:</dt>
              <dd>- Após selecionar o intervalo de tempo, clique no botão de filtar e
                as estatísticas de vendas serão geradas.</dd>
            </dl>
          </div>

          <div>
            <h5><b>Criar relatório de pedidos:</b></h5>
            <dl>
              <dt>Criar relatório:</dt>
              <dd>- Clique no botão para ser redirecionado para a página de criação de relatórios.</dd>
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

export default ModalHelpEstatisticas;
