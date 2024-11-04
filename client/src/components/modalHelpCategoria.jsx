import React from 'react';
import { Modal, Button } from 'react-bootstrap';
const modalHelpCategoria = ({ isOpen, onRequestClose }) => {
  return (
    <Modal show={isOpen} onHide={onRequestClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ajuda na página de categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div >
          <div>
              <h5><b>Efetuar cadastro de categoria:</b></h5>
            <div>
              <div>
                <dl>
                  <dt>Nome:</dt>
                  <dd>- Nome da categoria.</dd>
                  <dt>Botão Confirmar:</dt>
                  <dd>
                    - Ao conferir o nome correto à categoria, deve-se clicar no botão "Confirmar". Assim, se o cadastro foi bem-sucedido, um pop-up verde claro aparecerá na parte superior da tela avisando que foi bem-sucedido; caso contrário, o pop-up será vermelho, indicando que não foi possível. Se bem-sucedido, será redirecionado para a lista de todas as categorias cadastradas.
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div>
              <h5><b>Pesquisar categoria:</b></h5>
            <div>
              <div>
                <dl>
                  <dt>Barra de pesquisa localizada à direita:</dt>
                  <dd>- .</dd>
                  <dt>Limpar filtros:</dt>
                  <dd>- .</dd>
                </dl>
              </div>
            </div>
          </div>

          <div>
              <h5><b>Editar categoria:</b></h5>
            <div>
              <div>
                <dl>
                  <dt>Ícone de edição (lápis):</dt>
                  <dd>- .</dd>
                </dl>
              </div>
            </div>
          </div>

          <div>
              <h5><b>Deletar categoria:</b></h5>
            <div>
              <div>
                <dl>
                  <dt>Ícone de deletar (lixeira):</dt>
                  <dd>- .</dd>
                </dl>
              </div>
            </div>
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

export default modalHelpCategoria;
