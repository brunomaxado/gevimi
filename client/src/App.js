import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import Header from "./pages/Header";
import Produto from "./pages/Produto";
import "./style.css";
import GerenciarProduto from "./pages/editarProduto";
import Categoria from "./pages/Categoria";
import Cliente from "./pages/Cliente";
import ReadCliente from "./pages/readCliente";
import ReadPedido from "./pages/readPedido";
import EditarCliente from "./pages/editarCliente";
import Login from "./pages/login";
import Home from "./pages/home";
import Pedido from "./pages/Pedido";
import Footer from "./pages/Footer";
import Register from "./pages/register";
import React from "react";
import useAuth from "./context/useAuth";

const Private = ({ Component }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Component /> : <Login />;
};

function App() {
  const { currentUser } = useAuth(); // Obtenha o usuário atual do contexto de autenticação

  return (
    <div className="app">
      <BrowserRouter>
        {currentUser && <Header />} {/* Exibe o Header somente se houver um usuário autenticado */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pedido" element={<Pedido />} />
          <Route path="/viewProduto" element={<Private Component={Books} />} />
          <Route path="/produto" element={<Private Component={Produto} />} />
          <Route path="/gerenciarproduto/:id_produto" element={<Private Component={GerenciarProduto} />} />
          <Route path="/cliente" element={<Private Component={Cliente} />} />
          <Route path="/categoria" element={<Private Component={Categoria} />} />
          <Route path="/readCliente" element={<Private Component={ReadCliente} />} />
          <Route path="/readPedido" element={<Private Component={ReadPedido} />} />
          <Route path="/editarCliente/:id_cliente" element={<Private Component={EditarCliente} />} />
          <Route path="/home" element={<Private Component={Home} />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    
     <Footer />
    </div>
  );
}

export default App;
