import { BrowserRouter, Routes, Route } from "react-router-dom";
import readProduto from "./pages/readProduto";
import Header from "./pages/Header";
import Menu from "./pages/MenuLateral";
import Produto from "./pages/Produto";
import "./style.css";
import GerenciarProduto from "./pages/editarProduto";
import Categoria from "./pages/Categoria";
import Cliente from "./pages/Cliente";
import ReadCliente from "./pages/readCliente";
import ReadPedido from "./pages/readPedido";
import ReadPedidoUnico from "./pages/readPedidoUnico";
import EditarCliente from "./pages/editarCliente";
import Login from "./pages/login";
import Home from "./pages/home";
import Pedido from "./pages/Pedido";
import Footer from "./pages/Footer";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import React from "react";
import useAuth from "./context/useAuth";

const Private = ({ Component }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Component /> : <Login />;
};

function App() {
  const { currentUser } = useAuth(); 
  return (
    <><div className="app">
      <BrowserRouter>
        {currentUser && <Header />}
        {currentUser && <Menu />}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pedido" element={<Pedido />} />
          <Route path="/viewProduto" element={<Private Component={readProduto} />} />
          <Route path="/produto" element={<Private Component={Produto} />} />
          <Route path="/gerenciarproduto/:id_produto" element={<Private Component={GerenciarProduto} />} />
          <Route path="/cliente" element={<Private Component={Cliente} />} />
          <Route path="/categoria" element={<Private Component={Categoria} />} />
          <Route path="/readCliente" element={<Private Component={ReadCliente} />} />
          <Route path="/readPedido" element={<Private Component={ReadPedido} />} />
          <Route path="/readPedido/:id_pedido" element={<Private Component={ReadPedidoUnico} />} />
          <Route path="/editarCliente/:id_cliente" element={<Private Component={EditarCliente} />} />
          <Route path="/estatistica" element={<Private Component={Dashboard} />} />
          <Route path="/home" element={<Private Component={Home} />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>


    </div>{currentUser &&<Footer />}</>
  );
}

export default App;
