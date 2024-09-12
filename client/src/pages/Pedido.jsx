import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Pedido() {
  const [categorias, setCategorias] = useState([]); // Define the state inside the component
  const navigate = useNavigate(); // `useNavigate` is imported but currently unused

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:8800/pedido");
        setCategorias(response.data); // Set fetched data to state
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategorias();
  }, []); // This useEffect is correctly placed now inside the component

  return (
    <div>
      <h1>Pedido</h1>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>{categoria.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Pedido;
