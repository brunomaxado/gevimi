import { Link } from 'react-router-dom';
import '../style.css'; // Importa o arquivo de estilo principal
import { AuthContext } from "../context/authContext";
import React, { useContext, useState } from "react";
import axios from "axios";

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <link rel="stylesheet" href="https://fonts.googleapis.com/" />
      <div className="nav">
        <ul className="nav-list">
          <li id="pedido" className="direita">
            <Link to="/pedido">
              <span className="title">Novo Pedido</span>
            </Link>
          </li>

          <li className="nav-item">
            <div className='dropdown-user'>
              <span className="icon"><ion-icon name="people-circle-outline"></ion-icon></span>
              <span className="title">{currentUser?.nome}</span>

              {/* Conteúdo do dropdown */}
              <div className="dropdown-content-user">
                <p> <Link to="/alterarsenha" >Alterar Senha</Link></p>
                <p onClick={handleLogout}>  Sair</p>
              </div>
            </div>
      
          </li>
        </ul>
      </div>
    </header>
  );
};


export default Header;
