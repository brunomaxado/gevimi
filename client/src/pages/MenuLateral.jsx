import { Link } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import React, { useContext, useEffect, useState } from "react";

const Menu = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdowns, setShowDropdowns] = useState(false);

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

    return (
        <div className={`navigation ${isOpen ? 'open' : ''}`}>
            <button onClick={toggleMenu} className="menu-button">
                <ion-icon name="menu-outline"></ion-icon>
            </button>
            <ul>
                <li className="list active">
                    <Link to="/home" onClick={handleLinkClick}>
                        <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
                        <span className="title">Início</span>
                    </Link>
                </li>
                <li className="list">
                    <Link to="/categoria" onClick={handleLinkClick}>
                        <span className="icon"><ion-icon name="bookmarks-outline"></ion-icon></span>
                        <span className="title">Categorias</span>
                    </Link>
                </li>
                {currentUser.administrador === 1 && (
                <li className="list" >
                    <Link to="/readUsuario" onClick={handleLinkClick}>
                        <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
                        <span className="title">Usuários</span>
                        <span className="icon flecha"><ion-icon name="chevron-down-outline"></ion-icon></span>
                    </Link>
                    <div className={`dropdown-content ${showDropdowns ? 'show' : ''}`}>
                        <Link to="/register" onClick={handleLinkClick}>
                            <span className="icon-menor"><ion-icon name="chevron-forward-outline"></ion-icon></span>
                            <span className="title">Registrar</span>
                        </Link>
                        <Link to="/alterarSenha" onClick={handleLinkClick}>
                            <span className="icon-menor"><ion-icon name="chevron-forward-outline"></ion-icon></span>
                            <span className="title">Nova Senha</span>
                        </Link>
                    </div>
                </li>)}
                <li className="list">
                    <Link to="/readCliente" onClick={handleLinkClick}>
                        <span className="icon"><ion-icon name="people-outline"></ion-icon></span>
                        <span className="title">Clientes</span>
                        <span className="icon flecha"><ion-icon name="chevron-down-outline"></ion-icon></span>
                    </Link>
                    <div className={`dropdown-content ${showDropdowns ? 'show' : ''}`}>
                        <Link to="/cliente" onClick={handleLinkClick}>
                            <span className="icon-menor"><ion-icon name="chevron-forward-outline"></ion-icon></span>
                            <span className="title">Novo cliente</span>
                        </Link>
                  
                    </div>
                </li>
                <li className="list">
                    <Link to="/viewProduto" onClick={handleLinkClick}>
                        <span className="icon"><ion-icon name="pricetags-outline"></ion-icon></span>
                        <span className="title">Produtos</span>
                        <span className="icon flecha"><ion-icon name="chevron-down-outline"></ion-icon></span>
                    </Link>
                    <div className={`dropdown-content ${showDropdowns ? 'show' : ''}`}>
                        <Link to="/produto" onClick={handleLinkClick}>
                            <span className="icon-menor"><ion-icon name="chevron-forward-outline"></ion-icon></span>
                            <span className="title">Novo produto</span>
                        </Link>
                
                    </div>
                </li>
                <li className="list">
                    <Link to="/readPedido" onClick={handleLinkClick}>
                        <span className="icon"><ion-icon name="storefront-outline"></ion-icon></span>
                        <span className="title">Pedidos</span>
                        <span className="icon flecha"><ion-icon name="chevron-down-outline"></ion-icon></span>
                    </Link>
                    <div className={`dropdown-content ${showDropdowns ? 'show' : ''}`}>
                        <Link to="/pedido" onClick={handleLinkClick}>
                            <span className="icon-menor"><ion-icon name="chevron-forward-outline"></ion-icon></span>
                            <span className="title">Novo pedido</span>
                        </Link>
                  
                    </div>
                </li>
                <li className="list">
                    <Link to="/estatistica" onClick={handleLinkClick}>
                        <span className="icon"><ion-icon name="stats-chart-outline"></ion-icon></span>
                        <span className="title">Estatísticas</span>
                    </Link>
                </li>
                <li className="list">
                    <Link to="/" onClick={() => { logout(); handleLinkClick(); }}>
                        <span className="icon"><ion-icon name="log-out-outline"></ion-icon></span>
                        <span className="title">Sair</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
