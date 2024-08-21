import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button>
        <Link to="/produto">PRODUTO</Link>
      </button>

      <h1>GEVIMI</h1>

      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Promoção</th>
            <th>Preço Unitário</th>
            <th>Preço Desconto</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id_produto}>
              <td>{book.imagem && <img src={book.imagem} alt="" width="50" />}</td>
              <td>{book.nome}</td>
              <td>{book.descricao}</td>
              <td>{book.categoria}</td>
              <td>{book.promocao}</td>
              <td>R${book.preco_unitario}</td>
              <td>R${book.preco_desconto}</td>
              <td>
                <button className="delete" onClick={() => handleDelete(book.id_produto)}>Delete</button>
                <button className="update">
                  <Link
                    to={`/gerenciarproduto/${book.id_produto}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Update
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button>
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  );
};

export default Books;
