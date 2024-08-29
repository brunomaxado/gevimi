import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import Header from "./pages/Header";
import Produto from "./pages/Produto";
import "./style.css";
import GerenciarProduto from "./pages/GerenciarProduto";
import Categoria from "./pages/Categoria";
import Cliente from "./pages/Cliente";


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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;