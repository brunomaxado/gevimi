import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const modalHelpCliente = ({ isOpen, onRequestClose }) => {
  return (
    <Modal show={isOpen} onHide={onRequestClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ajuda no cadastro de cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5><b>Efetuar um cadastro de cliente: </b></h5>
          <div className="flex-fill">
          <dl >
            <dt>Nome:</dt>
            <dd>- Nome completo do cliente.</dd>
            <dt>CPF:</dt>
            <dd>- CPF do cliente deve ser válido, sem traços(-), de onze(11) dígitos. Impossível que outro cliente tenha o mesmo CPF.</dd>
            <dt> Celular:</dt>
            <dd> - Inclui o ddd e o número do cliente sem traços ou parênteses, contém onze(11) dígitos.</dd>
            <dt> Cidade:</dt>
            <dd> - Campo destinado ao município ou cidade da pessoa. </dd>
            <dt> CEP:</dt>
            <dd> - Campo destinado ao CEP, digite sem os traços, contém oito(8) dígitos, com o preenchimento do CEP,
            cidade, bairro e logradouro serão preenchidos automáticamente.</dd>
            <dt> Bairro:</dt>
            <dd> - Campo destinado ao bairro da pessoa.</dd>
            <dt> Logradouro:</dt>
            <dd> - Campo destinado ao endereço da pessoa, exemplo: Rua xxxxxxx. Av. yyyyyyyyyyy, etc...</dd>
            <dt> Número:</dt>
            <dd> - Campo destinado ao número do endereço da pessoa.</dd>
            <dt> Observação:</dt>
            <dd> -  Campo destinado a qualquer informação sobre a pessoa.
            Como por exemplo alergias e preferências.</dd>
          </dl>
          <p>*Os campos marcados com asterisco vermelho são obrigatórios. (Nome, CPF, Celular, CEP e Número).</p>
          <dl>
            <dt>Botão Confirmar:</dt>
            <dd> Ao conferir e atestar que todos os dados estão de acordo e dados obrigatórios foram preenchidos,
              deve-se clicar no botão "Confirmar", assim, se o cadastro foi bem sucedido, um pop-up verde claro 
              aparecerá na parte superior da tela avisando que foi bem sucedido, caso contrário o pop-up será
              vermelho indicando que não foi possível, se bem sucedido, será redirecionado para a lista de todos
              os clientes cadastrados.
            </dd>
          </dl>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onRequestClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default modalHelpCliente;
