import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../style.css'; // Certifique-se de importar o arquivo CSS

const Books = () => {
  const [books, setBooks] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/books/${selectedBookId}`);
      setBooks(books.filter(book => book.id_produto !== selectedBookId)); // Atualiza a lista de livros sem recarregar a página
      setShowModal(false); // Fecha o modal
    } catch (err) {
      console.log(err);
      setShowModal(false); // Fecha o modal mesmo em caso de erro
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  // Função para obter o nome da categoria com base no ID
  const getCategoriaNome = (id) => {
    const categoria = categorias.find(c => c.id_categoria === id);
    return categoria ? categoria.nome : "N/A";
  };

  return (
    <div  className="tabela">
      <h1>GEVIMI</h1>
       
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
          {books.map((book) => (
            <tr key={book.id_produto}>
              <td>{book.nome}</td>
              <td>{book.descricao}</td>
              <td>{getCategoriaNome(book.fk_id_categoria)}</td>
              <td>R${book.preco_unitario}</td>
              <td>
                <button className="delete" onClick={() => handleDeleteClick(book.id_produto)}>Delete</button>
                <button className="update">
                  <Link
                    to={`/gerenciarproduto/${book.id_produto}`}
                  >
                    Update
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal" >
          <div className="modal-content" >
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir o item?</p>
            <button class="modal-button" onClick={handleDelete} >Sim</button>
            <button class="modal-button"onClick={handleCancel} >Não</button>
          </div>
        </div>
      )}
    </div>
  );
};


export default Books;
