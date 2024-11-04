import React, { useState } from 'react';
import '../modal.css'; // Importa o arquivo de estilo para o modal
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from './tooltip';

const ModalHelpCliente = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h2>Ajuda no cadastro de cliente</h2>
          <button className="custom-modal-close" onClick={onRequestClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <h5><b>Efetuar um cadastro de cliente:</b></h5>
          <dl>
            <dt>Nome:</dt>
            <dd>- Nome completo do cliente.</dd>
            <dt>CPF:</dt>
            <dd>- CPF do cliente deve ser válido, sem traços(-), de onze(11) dígitos.</dd>
            <dt>Celular:</dt>
            <dd>- Inclui o DDD e o número do cliente sem traços ou parênteses.</dd>
            <dt>Cidade:</dt>
            <dd>- Campo destinado ao município ou cidade da pessoa.</dd>
            <dt>CEP:</dt>
            <dd>- Campo destinado ao CEP, digite sem os traços, contém oito(8) dígitos.</dd>
            <dt>Bairro:</dt>
            <dd>- Campo destinado ao bairro da pessoa.</dd>
            <dt>Logradouro:</dt>
            <dd>- Campo destinado ao endereço da pessoa.</dd>
            <dt>Número:</dt>
            <dd>- Campo destinado ao número do endereço da pessoa.</dd>
            <dt>Observação:</dt>
            <dd>- Campo destinado a qualquer informação sobre a pessoa.</dd>
          </dl>
          <p>*Os campos marcados com asterisco vermelho são obrigatórios.</p>
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

const CreateCliente = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      {/* Botão para abrir o modal de ajuda */}
      <div>
      <Tooltip text="Clique para ajuda">
        <button
          onClick={openModal}
          className="help-button"
          aria-label="Ajuda" // Para acessibilidade
        >
          <HelpOutlineIcon />
        </button>
        </Tooltip>
      </div>


      {/* Modal de ajuda */}
      <ModalHelpCliente isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default CreateCliente;
