import { Link } from 'react-router-dom';
import '../style.css'; // Importa o arquivo de estilo
import { AuthContext } from "../context/authContext";
import React, { useContext } from "react";
import axios from "axios";
const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <header className="header">
      <link rel="stylesheet" href="https://fonts.googleapis.com/" />
      <nav className="nav">
        <ul className="nav-list">

          <li id="logo" className="nav-item">
            <a href="/"><img src="../Icone.png"></img></a>
          </li>

          <li className="nav-item dropdown">
            <span className="nav-link, material-symbols-outlined">store</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/viewProduto" className="nav-link">Listar Produto</Link>
              </li>
              <li>
                <Link to="/produto" className="nav-link">Novo Produto</Link>
              </li>
              <li>
                <Link to="/readCliente" className="nav-link">Listar Cliente</Link>
              </li>
              <li>
                <Link to="/cliente" className="nav-link">Novo Cliente</Link>
              </li>
              <li>
                <Link to="/categoria" className="nav-link">Categoria</Link>
              </li>
            </ul>
          </li>
          
{/*  <li id="pedido" className="nav-item">
            <Link to="/pedido" className="nav-link">Novo Pedido</Link>
          </li> */}

         

          <li className="nav-item dropdown">
            <span className="material-symbols-outlined"> manage_accounts </span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/login" className="nav-link">
                  <span class="material-symbols-outlined" onClick={logout} >login</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="nav-link">
                  <span class="material-symbols-outlined" onClick={logout} >logout</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="nav-link">
                  <span class="material-symbols-outlined"> person_add </span>
                </Link>
              </li>
            </ul>
          </li>
          <li id="nome">
            <span> Usuário: {currentUser?.nome} </span>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default Header;