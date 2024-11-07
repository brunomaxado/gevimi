import { Link } from 'react-router-dom';
import React, { useState } from "react";
import '../ajuda.css';

const Ajuda = () => {
  const [estaAberto, setEstaAberto] = useState(false);
  const [indiceAtivo, setIndiceAtivo] = useState(0); // Controla qual link está ativo

  const tratarCliqueLink = (indice) => {
    setIndiceAtivo(indice); // Atualiza o índice ativo
  };

  return (
    <div className={`navegacao ${estaAberto ? 'aberta' : ''}`}>
      <ul>
        <li className={`list ${indiceAtivo === 0 ? 'ativa' : ''}`}>
          <Link to="/home" onClick={() => tratarCliqueLink(0)}>
            <span className="icone"><ion-icon name="help-circle-outline"></ion-icon></span>
            <span className="titulo">Ajuda</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Ajuda;
