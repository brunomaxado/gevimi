import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import Header from "./pages/Header";
import Produto from "./pages/Produto";
import "./style.css";
import GerenciarProduto from "./pages/GerenciarProduto";
import Categoria from "./pages/Categoria";
import Cliente from "./pages/Cliente";
import ReadCliente from "./pages/readCliente";
import EditarCliente from "./pages/editarCliente";
import Login from "./pages/login";
import Home from "./pages/home" ;
import Register from "./pages/register";
import React, { useContext } from "react";
import useAuth from "./context/useAuth";
const Private = ({ Component }) => {
  const { currentUser } = useAuth(); // Chame o hook useAuth corretamente

  // Verifique se currentUser está presente para determinar se o usuário está autenticado
  return currentUser ? <Component /> : <Login />;
};


function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/viewProduto" element={<Private Component={Books} />} />
                    <Route path="/produto" element={<Private Component={Produto} />} />
                    <Route path="/gerenciarproduto/:id_produto" element={<Private Component={GerenciarProduto} />} />
                    <Route path="/cliente" element={<Private Component={Cliente} />} />
                    <Route path="/categoria" element={<Private Component={Categoria} />} />
                    <Route path="/readCliente" element={<Private Component={ReadCliente} />} />
                    <Route path="/editarCliente/:id_cliente" element={<Private Component={EditarCliente} />} />
                    
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;