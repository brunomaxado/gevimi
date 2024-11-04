import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const modalHelpProduto = ({ isOpen, onRequestClose }) => {
  return (
    <Modal show={isOpen} onHide={onRequestClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ajuda no cadastro de Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div>
          <h5><b>Efetuar um cadastro de Produto: </b></h5>
          <div className="flex-fill">
          <dl >
            <dt>Nome:</dt>
            <dd>- Nome do produto.</dd>
            <dt>Descrição:</dt>
            <dd>- Descrição do produto como ingredientes e produtos alergênicos.</dd>
            <dt>Preço unitário:</dt>
            <dd> - Valor do produto por unidade.</dd>
            <dt> Categoria:</dt>
            <dd> - Selecionar a categoria dentre as já cadastradas. </dd>
          </dl>
          <p>*Os campos marcados com asterisco vermelho são obrigatórios. (Nome, preço unitário e categoria.).</p>
          <dl>
            <dt>Botão Confirmar:</dt>
            <dd> Ao conferir e atestar que todos os dados estão de acordo e dados obrigatórios foram preenchidos,
              deve-se clicar no botão "Confirmar", assim, se o cadastro foi bem sucedido, um pop-up verde claro 
              aparecerá na parte superior da tela avisando que foi bem sucedido, caso contrário o pop-up será
              vermelho indicando que não foi possível, se bem sucedido, será redirecionado para a lista de todos
              os produtos cadastrados.
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

export default modalHelpProduto;
