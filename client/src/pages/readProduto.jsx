import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../style.css'; // Certifique-se de importar o arquivo CSS

const ReadProduto = () => {
  const [produto, setProduto] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProdutoId, setSelectedProdutoId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("nome");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Número de itens exibidos por página
  const [selectedCategoria, setSelectedCategoria] = useState(""); // Estado para categoria selecionada
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProduto = async () => {
      try {
        const res = await axios.get("http://localhost:8800/readProduto");
        setProduto(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCategorias = async () => {
      try {
        const res = await axios.get("http://localhost:8800/allcategoria");
        setCategorias(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllProduto();
    fetchCategorias();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedProdutoId(id);
    setShowModal(true);
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/viewProduto");
    }, 1200);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/readProduto/${selectedProdutoId}`);
      setProduto(produto.filter(produto => produto.id_produto !== selectedProdutoId));
      showSuccess("Produto deletado com sucesso");
      setShowModal(false);
    } catch (err) {
      console.log(err);
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const getCategoriaNome = (id) => {
    const categoria = categorias.find(c => c.id_categoria === id);
    return categoria ? categoria.nome : "N/A";
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Resetar a página para 1 após a pesquisa
  };

  const handleSort = (column) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
  };

  const handleCategoriaChange = (e) => {
    setSelectedCategoria(e.target.value);
    setCurrentPage(1); // Resetar a página para 1 após mudar a categoria
  };

  const filteredProduto = produto.filter(produto => {
    const matchesSearch = produto.nome ? produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const matchesCategoria = selectedCategoria ? produto.fk_id_categoria === parseInt(selectedCategoria) : true;
    return matchesSearch && matchesCategoria;
  });

  const sortProduto = (produto) => {
    return produto.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  };

  const sortedProduto = sortProduto(filteredProduto);

  // Paginação: calcula os livros para a página atual
  const indexOfLastProduto = currentPage * itemsPerPage;
  const indexOfFirstProduto = indexOfLastProduto - itemsPerPage;
  const currentProduto = sortedProduto.slice(indexOfFirstProduto, indexOfLastProduto);

  // Muda para a próxima página
  const paginateNext = () => {
    if (currentPage < Math.ceil(filteredProduto.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Muda para a página anterior
  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="tabela">
      <h1>Listar produtos:</h1>
      
      <input
        type="text"
        placeholder="Pesquisar..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      <select
        value={selectedCategoria}
        onChange={handleCategoriaChange}
        className="categoria-select"
      >
        <option value="">Todas as Categorias</option>
        {categorias.map(categoria => (
          <option key={categoria.id_categoria} value={categoria.id_categoria}>
            {categoria.nome}
          </option>
        ))}
      </select>

      <div className="sort-buttons">
        <button onClick={() => handleSort("nome")}>
          Ordenar por Nome {sortColumn === "nome"}
        </button>
        <button onClick={() => handleSort("preco_unitario")}>
          Ordenar por Preço {sortColumn === "preco_unitario" }
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Preço Unitário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentProduto.map((produto) => (
            <tr key={produto.id_produto}>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>{getCategoriaNome(produto.fk_id_categoria)}</td>
              <td>R${produto.preco_unitario}</td>
              <td>
                <button className="update">
                  <Link to={`/gerenciarproduto/${produto.id_produto}`}>Atualizar</Link>
                </button>
                <button className="delete" onClick={() => handleDeleteClick(produto.id_produto)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="pagination">
        <button onClick={paginatePrev} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {Math.ceil(filteredProduto.length / itemsPerPage)}</span>
        <button onClick={paginateNext} disabled={currentPage === Math.ceil(filteredProduto.length / itemsPerPage)}>
          Próximo
        </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir o item?</p>
            <button className="modal-button" onClick={handleDelete}>Sim</button>
            <button className="modal-button" onClick={handleCancel}>Não</button>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <h2>{successMessage}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadProduto;
