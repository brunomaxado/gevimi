import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Relatorios = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Para o filtro de pesquisa
  const navigate = useNavigate();

  const relatorios = [
    {
      id: "pedido",
      nome: "Relatório de Pedidos",
    },
    {
      id: "produto",
      nome: "Relatório de Produtos",
    },
  ];

  // Função de filtro
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtra os relatórios com base no termo de busca
  const filteredRelatorios = relatorios.filter((relatorio) =>
    relatorio.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navegar para o relatório clicado
  const handleRelatorioClick = (id) => {
    navigate(`/relatorio/${id}`);
  };

  return (
    <div>
      <h1>Relatórios</h1>

 
      <div className="tabela-categoria">
    
      <table>
        <thead>
          <tr>
            <th>Relatório</th>
    
          </tr>
        </thead>
        <tbody>
          {filteredRelatorios.map((relatorio) => (
            <tr key={relatorio.id} onClick={() => handleRelatorioClick(relatorio.id)}>
              <td  style={{ cursor: "pointer"}}>{relatorio.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
  );
};

export default Relatorios;
