import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const modalHelpPedido = ({ isOpen, onRequestClose }) => {
  return (
    <Modal show={isOpen} onHide={onRequestClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ajuda no cadastro de Pedidos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div>
          <h5><b>Efetuar um cadastro de Pedido: </b></h5>
          <div className="flex-fill">
          <dl >
            <dt> </dt>
            <dd>- </dd>
            <dt> </dt>
            <dd>- </dd>
            <dt></dt>
            <dd> - </dd>
            <dt> </dt>
            <dd> -</dd>
            <dt></dt>
            <dd> -</dd>
            <dt></dt>
            <dd> - .</dd>
            <dt></dt>
            <dd> -</dd>
            <dt></dt>
            <dd> -</dd>
            <dt></dt>
            <dd> -</dd>
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
        <Button variant="secondary" onClick={onRequestClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default modalHelpPedido;
