import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Relatorios = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Para o filtro de pesquisa
  const navigate = useNavigate();

  const relatorios = [
    {
      id: 1,
      nome: "Relatório de Pedidos",
      filtros: ["Por Período", "Por Tipo", "Por Status", "Por Forma de Pagamento", "Por Data para Entregar"],
    },
    {
      id: 2,
      nome: "Relatório de Quantidade de Pedidos por Cliente",
      filtros: ["Por Cliente", "Por Tipo", "Por Valor", "Por Quantidade"],
    },
    {
      id: 3,
      nome: "Relatório de Quantidade de Pedidos por Usuário",
      filtros: ["Por Usuário", "Por Quantidade", "Por Status"],
    },
    {
      id: 4,
      nome: "Relatório de Quantidade de Venda de Produtos",
      filtros: ["Por Produto", "Por Período", "Por Categoria Produto", "Por Usuário", "Por Cliente"],
    },
    {
      id: 5,
      nome: "Relatório de Faturamento",
      filtros: ["Por Período", "Por Tipo", "Número de Pedidos", "Valor Total"],
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
              <td>{relatorio.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
  );
};

export default Relatorios;
