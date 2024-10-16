import { Link } from 'react-router-dom';
import '../style.css'; 
import { AuthContext } from "../context/authContext";
import React, { useContext } from "react";
import axios from "axios";
const Footer = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <footer className="footer">

      <link rel="stylesheet" href="https://fonts.googleapis.com/" />

     <img id="logo" src="../Icone.png"></img>

      <li id="nome" className="esquerda">
        <span> Usuário: {currentUser?.nome} </span>
      </li>
      

    </footer>
  );

};

export default Footer;