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
          <div class="esquerda">
            <li id="logo" className="nav-item">
              <a href="/home"><img src="../Icone.png"></img></a>
            </li>

            <li className="nav-item dropdown">
              <div>
                <span className="nav-link, material-symbols-outlined">store</span>
              </div>
              <ul className="dropdown-menu">
                <li>
                 <Link to="/viewProduto" className="nav-link"><p> Listar Produto</p> </Link>
                </li>
                <li>
                <Link to="/produto" className="nav-link"><p> Novo Produto</p> </Link>
                </li>
                <li>
                 <Link to="/readCliente" className="nav-link"><p>Listar Cliente</p></Link>
                </li>
                <li>
                 <Link to="/cliente" className="nav-link"><p>Novo Cliente</p></Link>
                </li>
                <li>
                 <Link to="/categoria" className="nav-link"><p>Categoria</p></Link>
                </li>
              </ul>
            </li>
          </div>
          <div class="esquerda">
            <li id="pedido" className="nav-item">
              <Link to="/pedido" className="nav-link">Novo Pedido</Link>
            </li>



            <li className="nav-item dropdown">
              <div>
                <span className="material-symbols-outlined"> manage_accounts </span>

              </div>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/" className="nav-link">
                    <div>
                      <span class="material-symbols-outlined" onClick={logout} >logout</span>
                      <span><p>Sair</p> </span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="nav-link">
                    <div>
                      <span class="material-symbols-outlined"> person_add </span>
                      <span> <p>Registrar Usuário</p></span>
                    </div>
                  </Link>
                </li>
              </ul>
            </li>

          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;