import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../style.css';
import VisibilityIcon from '@mui/icons-material/Edit';
import EditIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

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
  const itemsPerPage = 20; 
  const [selectedCategoria, setSelectedCategoria] = useState("");
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleDeleteClick = (id) => {
    setSelectedProdutoId(id);
    setShowModal(true);
    setErrorMessage(" ");
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
      
      // Captura a mensagem de erro enviada pelo backend, caso exista
      const errorMessage = err.response?.data?.message || "Erro ao deletar o produto";
      setErrorMessage(errorMessage);
      
      // Exibe o modal com a mensagem de erro
      setShowModal(true);
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
    setCurrentPage(1); 
  };

  const handleSort = (column) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
  };

  const handleCategoriaChange = (e) => {
    setSelectedCategoria(e.target.value);
    setCurrentPage(1); 
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

  // Paginação: calcula os produtos para a página atual
  const indexOfLastProduto = currentPage * itemsPerPage;
  const indexOfFirstProduto = indexOfLastProduto - itemsPerPage;
  const currentProduto = sortedProduto.slice(indexOfFirstProduto, indexOfLastProduto);

  // Total de páginas
  const totalPages = Math.ceil(filteredProduto.length / itemsPerPage);

  // Muda para a próxima página
  const paginateNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Muda para a página anterior
  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const [errorMessage, setErrorMessage] = useState(""); // Estado para a mensagem de erro
  
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <h1>Produtos:</h1>
      <div className="tabela">
        <div className="filters-container-produto">
          <div className="search-box">
            <label><SearchIcon className="search-icon" />  Pesquisar:</label>
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="filter-box">
            <label>Categoria:</label>
            <select
              value={selectedCategoria}
              onChange={handleCategoriaChange}
            >
              <option value="">Todas as Categorias</option>
              {categorias.map(categoria => (
                <option key={categoria.id_categoria} value={categoria.id_categoria}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>
          <button 
            className="limpar-filtro" 
            onClick={() => {
              setSearchTerm("");
              setSelectedCategoria("");
            }}
          >
            Limpar Filtros
          </button>
          <button className="adicionar-produto" onClick={() => navigate('/produto')}>
            Novo Produto
          </button>
        </div>

        <div className="tabela-produto">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th className="coluna-descricao">Descrição</th>
                <th>Categoria</th>
                <th className="coluna-preco">Preço Unitário</th>
                <th className="coluna-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentProduto.map((produto) => (
                <tr key={produto.id_produto}>
                  <td>{produto.nome}</td>
                  <td className="coluna-descricao">{produto.descricao}</td>
                  <td>{getCategoriaNome(produto.fk_id_categoria)}</td>
                  <td className="coluna-preco">R${produto.preco_unitario}</td>
                  <td className="coluna-center">
                    <div className="action-icons">
                      <span
                        className="action-icon delete"
                        onClick={() => handleDeleteClick(produto.id_produto)}
                        title="Cancelar"
                      >
                        <DeleteIcon />
                      </span>
                      <Link
                        to={`/gerenciarProduto/${produto.id_produto}`}
                        title="Visualizar"
                        className="action-icon visualizar"
                        style={{ textDecoration: 'none' }}
                      >
                        <VisibilityIcon />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {/* Botão "Anterior" - Renderizado apenas se não for a primeira página */}
          {currentPage !== 1 && (
            <button onClick={paginatePrev}>
              <ion-icon name="caret-back-outline"></ion-icon>
            </button>
          )}

          <span>{currentPage} de {totalPages}</span>

          {/* Botão "Próximo" - Renderizado apenas se não for a última página */}
          {currentPage !== totalPages && (
            <button onClick={paginateNext}>
              <ion-icon name="caret-forward-outline"></ion-icon>
            </button>
          )}
        </div>


        {showSuccessModal && (
          <div className="success-modal">
            <div className="success-modal-content">
              <h2>{successMessage}</h2>
            </div>
          </div>
        )}
        
      </div>
      {showModal && (
  <div className="modal">
    <div className="modal-content">
      <button className="close-modal" onClick={handleClose}>X</button> {/* Botão de fechar */}
      <h2>Confirmar Exclusão</h2>
      <p>Tem certeza que deseja excluir o cliente?</p>
      
      {/* Mensagem de erro, que aparecerá caso haja algum erro */}
      {errorMessage && (
  <div className="error-message show">
    {errorMessage}
  </div>
)}


      <div className="modal-div">
        <button className="modal-button" onClick={handleDelete}>Sim</button>
        <button className="modal-button" onClick={handleCancel}>Não</button>
      </div>
    </div>
  </div>
)}
    </div>   
  );
};

export default ReadProduto;
