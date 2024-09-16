import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../style.css'; // Certifique-se de importar o arquivo CSS

const Books = () => {
  const [books, setBooks] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
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
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
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

    fetchAllBooks();
    fetchCategorias();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedBookId(id);
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
      await axios.delete(`http://localhost:8800/books/${selectedBookId}`);
      setBooks(books.filter(book => book.id_produto !== selectedBookId));
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

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.nome ? book.nome.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const matchesCategoria = selectedCategoria ? book.fk_id_categoria === parseInt(selectedCategoria) : true;
    return matchesSearch && matchesCategoria;
  });

  const sortBooks = (books) => {
    return books.sort((a, b) => {
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

  const sortedBooks = sortBooks(filteredBooks);

  // Paginação: calcula os livros para a página atual
  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Muda para a próxima página
  const paginateNext = () => {
    if (currentPage < Math.ceil(filteredBooks.length / itemsPerPage)) {
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
      <h1>GEVIMI</h1>
      
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
          {currentBooks.map((book) => (
            <tr key={book.id_produto}>
              <td>{book.nome}</td>
              <td>{book.descricao}</td>
              <td>{getCategoriaNome(book.fk_id_categoria)}</td>
              <td>R${book.preco_unitario}</td>
              <td>
                <button className="update">
                  <Link to={`/gerenciarproduto/${book.id_produto}`}>Update</Link>
                </button>
                <button className="delete" onClick={() => handleDeleteClick(book.id_produto)}>Delete</button>
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
        <span>Página {currentPage} de {Math.ceil(filteredBooks.length / itemsPerPage)}</span>
        <button onClick={paginateNext} disabled={currentPage === Math.ceil(filteredBooks.length / itemsPerPage)}>
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

export default Books;
