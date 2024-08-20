import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Books from "./pages/Books";
import Header from "./pages/Header";
import Produto from "./pages/Produto";
import "./style.css";
import GerenciarProduto from "./pages/GerenciarProduto";


function App() {
  return (
    <div className="app">
      
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/produto" element={<Produto />} />
        
          <Route path="/gerenciarproduto/:id_produto" element={<GerenciarProduto />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;