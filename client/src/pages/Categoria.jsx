

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Categoria = () => {
  const [categoria, setCategoria] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade do modal
  const [newCategoria, setNewCategoria] = useState(""); // Estado para o nome da nova categoria

  useEffect(() => {
    const fetchAllCategorias = async () => {
      try {
        const res = await axios.get("http://localhost:8800/categoria");
        setCategoria(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCategorias();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/categoria/${id}`);
      setCategoria(categoria.filter(c => c.id_categoria !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    try {
      if (newCategoria) {
        await axios.post("http://localhost:8800/categoria", { nome: newCategoria });
        setNewCategoria(""); // Limpa o campo após a adição
        setShowModal(false); // Fecha o modal
        // Atualize a lista de categorias
        const res = await axios.get("http://localhost:8800/categoria");
        setCategoria(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };




  const handleUpdate = async () => {
    try {
      if (newCategoria) {
        await axios.put("http://localhost:8800/categoria", { nome: newCategoria });
        setNewCategoria(""); // Limpa o campo após a adição
        setShowModal(false); // Fecha o modal
        // Atualize a lista de categorias
        const res = await axios.get("http://localhost:8800/categoria");
        setCategoria(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(newCategoria);
  return (
    <div>
      <h1>GEVIMI</h1>
      <button className="categoriaAdd" onClick={() => setShowModal(true)}>Nova Categoria</button>
      
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times; </span>
            <h2>Adicionar Nova Categoria</h2>
            <input
              type="text"
              value={newCategoria}
              onChange={(e) => setNewCategoria(e.target.value)}
              placeholder=" Nome da Categoria"
            />
            <br/> <br/>
            <button onClick={handleAdd}>Adicionar</button>
          </div>
        </div>
      )}

      <br /><br /><br /><br />
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categoria.map((categoria) => (
            <tr key={categoria.id_categoria}>
              <td>{categoria.id_categoria}</td>
              <td>{categoria.nome}</td>
              <td>
                <button className="delete" onClick={() => handleDelete(categoria.id_categoria)}>Delete</button>
                <button className="update">
                  
                    Update
                 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categoria;
