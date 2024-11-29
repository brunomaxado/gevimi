import { Link, useNavigate } from 'react-router-dom';
import '../style.css';
import { AuthContext } from "../context/authContext";
import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useModified } from "../context/ModifiedContext";

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isModified } = useModified();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [exitAction, setExitAction] = useState(""); // Define qual ação está sendo confirmada

  const handleLogout = () => {
    logout();
  };

  const handleButtonClick = (action) => {
    // Verifica se o isModified é falso para navegar sem confirmação
    if (!isModified) {
      performAction(action); // Realiza a ação diretamente
      return; // Impede a execução do restante do código
    }
  
    // Ações que precisam de confirmação
    const requiresConfirmation = [
      '/editarCliente/',
      '/gerenciarProduto/',
      '/editarUsuario/',
      '/alterarsenha', // Certifique-se de que o caminho esteja correto
      '/cliente',
      '/produto',
      '/register',
      '/pedido',
      '/relatorio/'
    ];
  
    // Verifica se o caminho atual exige confirmação
    if (requiresConfirmation.some(path => window.location.pathname.includes(path))) {
      setExitAction(action); // Define a ação
      setShowDeleteModal(true); // Abre o modal
    } else {
      performAction(action); // Realiza a ação diretamente
    }
  };
  

  const performAction = (action) => {
    if (action === "novoPedido") {
      if (window.location.pathname === '/pedido') {
          window.location.reload(); // Recarrega a página se já estiver na página de pedidos
      } else {
          navigate('/pedido'); // Navega para a página de pedidos se não estiver nela
      }
    } else if (action === "alterarSenha") {
      navigate('/alterarsenha');
    } else if (action === "sair") {
      handleLogout();
    }
  };

  const handleConfirmExit = () => {
    performAction(exitAction); // Executa a ação confirmada
    setShowDeleteModal(false); // Fecha o modal
  };

  const handleCancelExit = () => {
    setShowDeleteModal(false); // Fecha o modal sem realizar a ação
  };

  return (
    <div>
       {isModified && <p>Existem alterações não salvas!</p>}
      <header className="header">
        <div className="nav">
          <ul className="nav-list">
            <li id="pedido" className="direita">
              <button onClick={() => handleButtonClick("novoPedido")} className="titlebtn" type="button">
                Novo Pedido
              </button>
            </li>

            <li className="nav-item">
              <div className="dropdown-user">
                <span className="icon"><ion-icon name="people-circle-outline"></ion-icon></span>
                <span className="title">{currentUser?.nome}</span>

                <div className="dropdown-content-user">
                  <p><span className="link" onClick={() => handleButtonClick("alterarSenha")}>Alterar Senha</span></p>
                  <p><span className="link" onClick={() => handleButtonClick("sair")}>Sair</span></p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </header>

      {showDeleteModal &&
        ReactDOM.createPortal(
          <div className="modal">
            <div className="modal-content">
              <button className="close-modal" onClick={handleCancelExit}>X</button>
              <h2 style={{ textAlign: 'center' }}>Sair da página</h2>
              <p style={{ textAlign: 'center' }}>Tem certeza que deseja sair da página? Seus dados não serão salvos se não confirmar o envio.</p>
              <div className="modal-div">
                <button className="modal-button" onClick={handleConfirmExit}>Sair</button>
                <button className="modal-button" onClick={handleCancelExit}>Ficar</button>
              </div>
            </div>
          </div>,
          document.body
        )
      }
    </div>
  );
};

export default Header;
