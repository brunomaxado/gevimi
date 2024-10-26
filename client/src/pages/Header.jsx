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
 

         
          <li id="pedido" className=" direita">
            <Link to="/pedido">

            <span className="title">Novo Pedido</span>
            </Link>
           
          </li>



          <li className="nav-item">

          <span className="icon"><ion-icon name="people-circle-outline"></ion-icon></span>
          <span className="title">Usuário: |{currentUser?.nome}|</span>

          </li>


        </ul>

      </div>
    </header>
  );
};

export default Header;