
import { Link } from 'react-router-dom';
import './Header.css'; // Importa o arquivo de estilo
import { AuthContext } from "../context/authContext";
import React, { useContext } from "react";
const Header = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item dropdown">
            <span className="nav-link">Produto</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/" className="nav-link">Listar Produto</Link>
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
            <Link to="/categoria" className="nav-link">Categoria</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">criar conta  |</Link>
          </li>
          <li className="nav-item">
          <Link to="/register" className="nav-link">|  usuario conectado: <span>{currentUser?.nome}</span></Link>
          </li>
        
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
