import { Link } from 'react-router-dom';
import '../style.css'; 
import { AuthContext } from "../context/authContext";
import React, { useContext } from "react";
import axios from "axios";
const Footer = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <footer className="footer">

      

    </footer>
  );

};

export default Footer;