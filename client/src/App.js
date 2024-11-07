import { BrowserRouter, Routes, Route } from "react-router-dom";
import readProduto from "./pages/readProduto";
import Header from "./pages/Header";
import Menu from "./pages/MenuLateral";
import Ajuda from ".pages/MenuAjuda";
import Produto from "./pages/Produto";
import "./style.css";
import GerenciarProduto from "./pages/editarProduto";
import Categoria from "./pages/Categoria";
import Cliente from "./pages/Cliente";
import ReadCliente from "./pages/readCliente";
import ReadPedido from "./pages/readPedido";
import ReadPedidoUnico from "./pages/readPedidoUnico";
import ReadUsuario from "./pages/readUsuario";
import EditarCliente from "./pages/editarCliente";
import EditarUsuario from "./pages/editarUsuario";
import Login from "./pages/login";
import Home from "./pages/home";
import Pedido from "./pages/Pedido";
import Footer from "./pages/Footer";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import React from "react";
import useAuth from "./context/useAuth";
import AlterarSenha from "./pages/alterarSenha";

const Private = ({ Component }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Component /> : <Login />;
};
const AdminPrivate = ({ Component }) => {
  const { currentUser } = useAuth();

  // Verifica se o usuário está logado e se é administrador
  return currentUser && currentUser.administrador === 1 ? (
    <Component />
  ) : (
    <Home /> // Redireciona para o login se não for admin ou não estiver logado
  );
};

const LoginPrivate = ({ Component }) => {
  const { currentUser } = useAuth();

  // Só permite acessar a página de login se o usuário estiver deslogado
  return currentUser === null ? (
    <Component />
  ) : (
    <Home /> // Redireciona para a página "home" se o usuário estiver logado
  );
};

function App() {
  const { currentUser } = useAuth(); 
  return (
    <><div className="app">
      <BrowserRouter>
        {currentUser && <Header />}
        {currentUser && <Menu />}
        {currentUser && <Ajuda />}

        <Routes>
        
          <Route path="/register" element={<AdminPrivate Component={Register} />} /> {/* Apenas admins podem registrar novos usuários */}
          <Route path="/login" element={<LoginPrivate Component={Login} />} />
          <Route path="/pedido" element={<Pedido />} />
          <Route path="/viewProduto" element={<Private Component={readProduto} />} />
          <Route path="/produto" element={<Private Component={Produto} />} />
          <Route path="/gerenciarproduto/:id_produto" element={<Private Component={GerenciarProduto} />} />
          <Route path="/cliente" element={<Private Component={Cliente} />} />
          <Route path="/categoria" element={<Private Component={Categoria} />} />
          <Route path="/readCliente" element={<Private Component={ReadCliente} />} />
          <Route path="/readPedido" element={<Private Component={ReadPedido} />} />
          <Route path="/readUsuario" element={<Private Component={ReadUsuario} />} />
          <Route path="/readPedido/:id_pedido" element={<Private Component={ReadPedidoUnico} />} />
          <Route path="/editarCliente/:id_cliente" element={<Private Component={EditarCliente} />} />
          <Route path="/editarUsuario/:id_usuario" element={<Private Component={EditarUsuario} />} />
          <Route path="/estatistica" element={<Private Component={Dashboard} />} />
          <Route path="/alterarsenha" element={<Private Component={AlterarSenha} />} />
          <Route path="/home" element={<Private Component={Home} />} />
          <Route path="/" element={<LoginPrivate Component={Login} />} />
        </Routes>
      </BrowserRouter>


    </div>{currentUser &&<Footer />}</>
  );
}

export default App;
