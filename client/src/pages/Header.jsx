import { Link } from 'react-router-dom';
import './Header.css'; // Importa o arquivo de estilo
import { AuthContext} from "../context/authContext";
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
            <span className="nav-link">Produto</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/viewProduto" className="nav-link">Listar Produto</Link>
              </li>
              <li>
                <Link to="/produto" className="nav-link">Novo Produto</Link>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <span className="nav-link">Cliente</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/readCliente" className="nav-link">Listar Cliente</Link>
              </li>
              <li>
                <Link to="/cliente" className="nav-link">Novo Cliente</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link to="/categoria" className="nav-link">Categoria / user: {currentUser?.nome}</Link>
          </li>
       
          <li className="nav-item dropdown">
              <span className="material-symbols-outlined"> manage_accounts </span>
              <ul className="dropdown-menu">
                <li>
                <span> {currentUser?.nome} </span>
                </li>
                <li>

                  
                    <Link to="/login" className="nav-link">
                    <span  class="material-symbols-outlined" onClick={ logout} >logout</span>
                  </Link>
                </li>





                <li>
                  <Link to="/register" className="nav-link">
                    <span class="material-symbols-outlined"> person_add </span>
                  </Link>
                </li>
              </ul>
          </li>


        </ul>
      </nav>
    </header>
  );
};

export default Header;