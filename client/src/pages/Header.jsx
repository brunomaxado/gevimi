import { Link } from 'react-router-dom';
import '../style.css'; // Importa o arquivo de estilo principal
import { AuthContext } from "../context/authContext";
import React, { useContext, useState } from "react";
import axios from "axios";

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <p>  <Link to="/alterarsenha">Alterar Senha</Link></p>
    <p onClick={handleLogout}>Sair</p>
  </div>
</div>

            {isMenuOpen && (
              <ul className="submenu" style={submenuStyles}>
                <li className="submenu-item">
                  <spam onClick={handleLogout} className="submenu-spam" style={spamStyles}>Sair</spam>
                </li>
                <li className="submenu-item">
                  <Link to="/alterar-senha" className="submenu-link" style={linkStyles}>Alterar Senhssa</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

const submenuStyles = {
  backgroundColor: "black",
  color: "white",
  position: "absolute",
  listStyle: "none",
  padding: "10px",
  borderRadius: "4px",
  marginTop: "5px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
};

const spamStyles = {
  display: "block",
  color: "white",
  cursor: "pointer",
  padding: "8px 12px",
  width: "100%",
  textAlign: "left"
};

const linkStyles = {
  color: "white",
  textDecoration: "none",
  display: "block",
  padding: "8px 12px",
  textAlign: "left"
};

export default Header;
