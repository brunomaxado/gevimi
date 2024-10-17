import { Link } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import React, { useContext, useEffect } from "react";
import axios from "axios";

const Menu = () => {
    const { currentUser, logout } = useContext(AuthContext);

    useEffect(() => {
        const list = document.querySelectorAll('.list');
        function activeLink() {
            list.forEach((item) => item.classList.remove('active'));
            this.classList.add('active');
        }
        list.forEach((item) => item.addEventListener('click', activeLink));
    }, []);

    return (
        <div className="navigation">
            <ul>
                <li className="list active">
                    <a href="#">
                        <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
                        <span className="title">Home</span>
                    </a>
                </li>
                <li className="list">
                    <a href="#">
                        <span className="icon"><ion-icon name="people-outline"></ion-icon></span>
                        <span className="title">Outros</span>
                    </a>
                </li>
                <li className="list">
                    <a href="#">
                        <span className="icon"><ion-icon name="chatbox-outline"></ion-icon></span>
                        <span className="title">Demais</span>
                    </a>
                </li>
                <li className="list">
                    <a href="#">
                        <span className="icon"><ion-icon name="settings-outline"></ion-icon></span>
                        <span className="title">Palavras</span>
                    </a>
                </li>
                <li className="list">
                    <a href="#">
                        <span className="icon"><ion-icon name="help-circle-outline"></ion-icon></span>
                        <span className="title">Ajuda</span>
                    </a>
                </li>
                <li className="list">
                    <a href="#">
                        <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                        <span className="title">Segurança</span>
                    </a>
                </li>
                <li className="list">
                    <a href="#">
                        <span className="icon"><ion-icon name="log-out-outline"></ion-icon></span>
                        <span className="title">Sair</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
