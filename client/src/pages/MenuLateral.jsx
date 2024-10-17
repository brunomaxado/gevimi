import { Link } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        const list = document.querySelectorAll('.list');
        function activeLink() {
            list.forEach((item) => item.classList.remove('active'));
            this.classList.add('active');
            if (this.querySelector('.dropdown-content')) {
                this.classList.toggle('dropdown-active');
            } else {
                list.forEach((item) => item.classList.remove('dropdown-active'));
            }
        }
        list.forEach((item) => item.addEventListener('click', activeLink));
    }, []);

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <div className="navigation">
            <ul>
                <li className="list active">
                    <Link to="/home">
                        <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
                        <span className="title">Início</span>
                    </Link>
                </li>
                <li className="list">
                    <Link to="#">
                        <span className="icon"><ion-icon name="bookmarks-outline"></ion-icon></span>
                        <span className="title">Categorias</span>
                        <span className="icon flecha"><ion-icon name="chevron-down-outline"></ion-icon></span>
                    </Link>
                </li>
                <li className="list" onClick={() => toggleDropdown(1)}>
                    <Link to="#">
                        <span className="icon"><ion-icon name="people-outline"></ion-icon></span>
                        <span className="title">Clientes</span>
                        <span className="icon flecha"><ion-icon name="chevron-down-outline"></ion-icon></span>
                    </Link>
                    {openDropdown === 1 && (
                        <div className="dropdown-content">
                            <Link to="/"><span className="title">Novo cliente</span></Link>
                            <Link to="/"><span className="title">Listar clientes</span></Link>
                        </div>
                    )}
                </li>
                
                <li className="list"  onClick={() => toggleDropdown(2)}>
                    <Link to="#">
                        <span className="icon"><ion-icon name="pricetags-outline"></ion-icon></span>
                        <span className="title">Produtos</span>
                        <span className="icon flecha"><ion-icon name="chevron-down-outline"></ion-icon></span>
                    </Link>
                    {openDropdown === 2 && (
                    <div className="dropdown-content">
                        <Link to="/produto"><span className="title">Novo produto</span></Link>
                        <Link to="/viewProduto"><span className="title">Listar produto</span></Link>
                    </div>
                     )}
                </li>
                <li className="list">
                    <Link to="#">
                        <span className="icon"><ion-icon name="help-circle-outline"></ion-icon></span>
                        <span className="title">Ajuda</span>
                    </Link>
                </li>
                <li className="list">
                    <Link to="/estatistica">
                        <span className="icon"><ion-icon name="stats-chart-outline"></ion-icon></span>
                        <span className="title">Estatísticas</span>
                    </Link>
                </li>
                <li className="list">
                    <Link to="/" onClick={logout}>
                        <span className="icon"><ion-icon name="log-out-outline"></ion-icon></span>
                        <span className="title" >Sair</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
