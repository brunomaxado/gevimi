import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import React, { useContext, useEffect, useState } from "react";
import '../style.css';
import ReactDOM from "react-dom";
import { useModified } from "../context/ModifiedContext";
const Menu = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdowns, setShowDropdowns] = useState(false);
    const { isModified } = useModified();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [exitAction, setExitAction] = useState(""); // Define qual ação está sendo confirmada
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setShowDropdowns(!showDropdowns);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
        setShowDropdowns(false); // Fecha todos os dropdowns
    };

    useEffect(() => {
        const list = document.querySelectorAll('.list');
        function activeLink() {
            list.forEach((item) => item.classList.remove('active'));
            this.classList.add('active');
        }
        list.forEach((item) => item.addEventListener('click', activeLink));
    }, []);

    const handleButtonClick = (action) => {
        // Ações que precisam de confirmação
        if (!isModified) {
            performAction(action); // Realiza a ação diretamente
            return; // Impede a execução do restante do código
          }
        const requiresConfirmation = [
          '/editarCliente/',
          '/gerenciarProduto/',
          '/editarUsuario/',
          '/alterarsenha', // Certifique-se de que o caminho esteja correto
          '/cliente',
          '/produto',
          '/register',
          '/pedido',
          '/relatorio/',
          
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
        if (action === "categoria") {
            navigate('/categoria');
            handleLinkClick(); // Fecha o menu após navegação
        } else if (action === "usuario") {
            navigate('/readUsuario');
            handleLinkClick(); 
        }   else if (action === "register") {
                navigate('/register');
                handleLinkClick(); 
         }     else if (action === "alterarsenha") {
                    navigate('/alterarsenha');
                    handleLinkClick(); 
                }     else if (action === "cliente") {
                    navigate('/readCliente');
                    handleLinkClick(); 
                }     else if (action === "novocliente") {
                    navigate('/cliente');
                    handleLinkClick(); 
                }     else if (action === "produto") {
                    navigate('/viewProduto');
                    handleLinkClick(); 
                }     else if (action === "novoproduto") {
                    navigate('/produto');
                    handleLinkClick(); 
                }     else if (action === "pedido") {
                    navigate('/readPedido');
                    handleLinkClick(); 
                }     else if (action === "novopedido") {
                    navigate('/pedido');
                    handleLinkClick();        
                }     else if (action === "home") {
                    navigate('/home');
                    handleLinkClick();        

        } else if (action === "sair") {
            // Implementação da ação de sair, se necessário
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
        <div className={`navigation ${isOpen ? 'open' : ''}`}>
            <button onClick={toggleMenu} className="menu-button">
                <ion-icon name="menu-outline" title="Menu"></ion-icon>
            </button>
            <ul>
                <li className="list active">
                <Link to="#" onClick={(e) => e.preventDefault()}>
                        <span onClick={() => handleButtonClick("home")}className="icon"><ion-icon name="home-outline" title="Página inicial"></ion-icon></span>
                        <span onClick={() => handleButtonClick("home")}className="title">Início</span>
                    </Link>
                </li>

                <li className="list">
                     <Link to="#" onClick={(e) => e.preventDefault()}>
                              <span onClick={() => handleButtonClick("categoria")} className="icon">
                                       <ion-icon name="bookmarks-outline" title="Categorias"></ion-icon>
                             </span>

                             <span onClick={() => handleButtonClick("categoria")} className="title">
                                           Categorias
                             </span>
                     </Link>
                </li>


                
                {currentUser.administrador === 1 && (
                <li className="list" >
                    <Link  to="#" onClick={(e) => e.preventDefault()}>
                        <span onClick={() => handleButtonClick("usuario")} className="icon"><ion-icon name="person-outline" title="Usuários"></ion-icon></span>
                        <span onClick={() => handleButtonClick("usuario")} className="title">Usuários</span>
                        <span className="icon flecha"><ion-icon name="chevron-down-outline"></ion-icon></span>
                    </Link>

                    <div className={`dropdown-content ${showDropdowns ? 'show' : ''}`}>

                           <Link  to="#" onClick={(e) => e.preventDefault()}>
                            <span onClick={() => handleButtonClick("register")} className="icon-menor"><ion-icon name="chevron-forward-outline"></ion-icon></span>
                            <span onClick={() => handleButtonClick("register")}className="title">Novo Usuário</span>
                        </Link>



                        <Link  to="#" onClick={(e) => e.preventDefault()}>
                            <span onClick={() => handleButtonClick("alterarsenha")} className="icon-menor"><ion-icon name="chevron-forward-outline"></ion-icon></span>
                            <span onClick={() => handleButtonClick("alterarsenha")} className="title">Alterar Senha</span>
                        </Link>
                    </div>
                </li>)}
                <li className="list">
                     <Link  to="#" onClick={(e) => e.preventDefault()}>
                        <span onClick={() => handleButtonClick("cliente")}className="icon"><ion-icon name="people-outline" title="Clientes"></ion-icon></span>
                        <span onClick={() => handleButtonClick("cliente")}className="title">Clientes</span>
                        <span className="icon flecha"><ion-icon name="chevron-down-outline"></ion-icon></span>
                     </Link>

                    <div className={`dropdown-content ${showDropdowns ? 'show' : ''}`}>
                               <Link  to="#" onClick={(e) => e.preventDefault()}>
                            <span onClick={() => handleButtonClick("novocliente")} className="icon-menor"><ion-icon name="chevron-forward-outline"></ion-icon></span>
                            <span onClick={() => handleButtonClick("novocliente")} className="title">Novo cliente</span>
                        </Link>
                  
                    </div>
                </li>
                <li className="list">
                <Link  to="#" onClick={(e) => e.preventDefault()}>
                        <span onClick={() => handleButtonClick("produto")} className="icon"><ion-icon name="pricetags-outline" title="Produtos"></ion-icon></span>
                        <span onClick={() => handleButtonClick("produto")} className="title">Produtos</span>
                        <span className="icon flecha"><ion-icon name="chevron-down-outline"></ion-icon></span>
                    </Link>
                    <div className={`dropdown-content ${showDropdowns ? 'show' : ''}`}>
                    <Link  to="#" onClick={(e) => e.preventDefault()}>
                            <span  onClick={() => handleButtonClick("novoproduto")} className="icon-menor"><ion-icon name="chevron-forward-outline"></ion-icon></span>
                            <span  onClick={() => handleButtonClick("novoproduto")} className="title">Novo produto</span>
                        </Link>
                
                    </div>
                </li>
                <li className="list">
                <Link  to="#" onClick={(e) => e.preventDefault()}>
                        <span onClick={() => handleButtonClick("pedido")}className="icon"><ion-icon name="storefront-outline" title="Pedidos"></ion-icon></span>
                        <span onClick={() => handleButtonClick("pedido")} className="title">Pedidos</span>
                        <span  className="icon flecha"><ion-icon name="chevron-down-outline"></ion-icon></span>
                    </Link>
                    <div className={`dropdown-content ${showDropdowns ? 'show' : ''}`}>
                    <Link  to="#" onClick={(e) => e.preventDefault()}>
                            <span onClick={() => handleButtonClick("novopedido")} className="icon-menor"><ion-icon name="chevron-forward-outline"></ion-icon></span>
                            <span onClick={() => handleButtonClick("novopedido")} className="title">Novo pedido</span>
                        </Link>
                  
                    </div>
                </li>
           
                <li className="list">
                <Link  to="#" onClick={(e) => e.preventDefault()}>
                    <span className="icon"><ion-icon name="document-text-outline" title="Relatório"></ion-icon></span>

                        <span className="title">Relatório</span>
                    </Link>
                </li>
                <li className="list">
                    <Link to="/" onClick={() => { logout(); handleLinkClick(); }}>
                        <span className="icon"><ion-icon name="log-out-outline" title="Sair da conta"></ion-icon></span>
                        <span className="title">Sair</span>
                    </Link>
                </li>
            </ul>
            {showDeleteModal &&
        ReactDOM.createPortal(
          <div className="modal">
            <div className="modal-content">
              <button className="close-modal" onClick={handleCancelExit}>X</button>
              <h2 style={{ textAlign: 'center' }}>Sair da página</h2>
              <p style={{ textAlign: 'center' }}>Tem certeza que deseja sair da página? Seus dados não serão salvos se não confirmar o envio.</p>
              <div className="modal-div">
                <button className="modal-button" onClick={handleConfirmExit}>Sim</button>
                <button className="modal-button" onClick={handleCancelExit}>Não</button>
              </div>
            </div>
          </div>,
          document.body
        )
      }
        </div>
    );
};

export default Menu;
