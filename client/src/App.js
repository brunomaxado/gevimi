import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Books from "./pages/Books";
import Produto from "./pages/Produto";
import "./style.css"
import GerenciarProduto from "./pages/GerenciarProduto";


function App() {
  return (
    <div className="app">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/produto" element={<Produto />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/gerenciarproduto/:id_produto" element={<GerenciarProduto />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;