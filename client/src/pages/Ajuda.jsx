import { Link } from 'react-router-dom';
import React, { useState } from "react";
import '../ajuda.css';

const Ajuda = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Controla qual link está ativo

  const handleLinkClick = (index) => {
    setActiveIndex(index); // Atualiza o índice ativo
  };

  return (
    <div className={`navigation ${isOpen ? 'open' : ''}`}>
      <ul>
        <li className={`list ${activeIndex === 0 ? 'active' : ''}`}>
          <Link to="/home" onClick={() => handleLinkClick(0)}>
            <span className="icon"><ion-icon name="help-circle-outline"></ion-icon></span>
            <span className="title">Ajuda</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Ajuda;
