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
      <div class="nav">
        <ul className="nav-list">
          <li id="logo" className="nav-item, esquerda">
            <a href="/home"><img src="../Icone.png"></img></a>
          </li>

         
          <li id="pedido" className="nav-item, direita">
            <Link to="/pedido">
            <span className="icon"><ion-icon name="storefront-outline"></ion-icon></span>
            <span className="title">Novo Pedido</span>
            </Link>
           
          </li>



          <li className="nav-item dropdown">

          <span className="icon"><ion-icon name="people-circle-outline"></ion-icon></span>
          <span className="title">Usuário: |{currentUser?.nome}|</span>


            <ul className="dropdown-menu">
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


        </ul>

      </div>
    </header>
  );
};

export default Header;