import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:8800/pedido");
        setCategorias(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategorias();
  }, []);
function Pedido() {
  return (
    <div>Pedido</div>
  )
}

export default Pedido