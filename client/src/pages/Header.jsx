// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Importa o arquivo de estilo

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Books</Link>
          </li>
          <li className="nav-item">
            <Link to="/produto" className="nav-link">Produto</Link>
          </li>
          <li className="nav-item">
            <Link to="/gerenciarproduto/:id_produto" className="nav-link">Gerenciar Produto</Link>
          </li>
          <li className="nav-item">
            <Link to="/categoria" className="nav-link">Categoria</Link>
          </li>
          <li className="nav-item">
            <Link to="/cliente" className="nav-link">Cliente</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
