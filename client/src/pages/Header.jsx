import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Importa o arquivo de estilo

const Header = () => {
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
