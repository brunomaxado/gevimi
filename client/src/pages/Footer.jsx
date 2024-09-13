import { Link } from 'react-router-dom';
import '../style.css'; // Importa o arquivo de estilo
import { AuthContext } from "../context/authContext";
import React, { useContext } from "react";
import axios from "axios";
const Footer = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <footer className="footer">
      <link rel="stylesheet" href="https://fonts.googleapis.com/" />

            <a href="/"><img id="logo" src="../Icone.png"></img></a>

          <li id="nome">
            <span> Usuário: {currentUser?.nome} </span>
          </li>

    </footer>
  );
};

export default Footer;