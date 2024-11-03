import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const modalHelpCategoria = ({ isOpen, onRequestClose }) => {
  return (
    <Modal show={isOpen} onHide={onRequestClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ajuda no cadastro de categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>palavras palavras</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default modalHelpCategoria;
