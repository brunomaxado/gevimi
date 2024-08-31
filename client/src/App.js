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
import Register from "./pages/register";
function App() {
  return (
    <div className="app">
      
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/produto" element={<Produto />} />
          <Route path="/gerenciarproduto/:id_produto" element={<GerenciarProduto />} />
          <Route path="/cliente" element={<Cliente/>} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path="/readCliente" element={<ReadCliente />} />
          <Route path="/editarCliente/:id_cliente" element={<EditarCliente />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


