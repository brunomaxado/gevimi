import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style.css'; // Importa um arquivo CSS para estilizar a página

const Home = () => {
  return (
    <div className="home-container">
      <section className="intro-section">
        <h1>Bem-vindo à página inicial</h1>
        <h2>Sistema de gerenciamento GEVIMI</h2>
        <h4>Faça um pedido ou acesse o menu lateral para demais funções</h4>
      </section>
    </div>
  );
};

export default Home;
