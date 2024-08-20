import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
        console.log(res)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };
  return ( 
    <div> 
      <button> <Link to="/produto">  PRODUTO </Link> </button>

      <h1>GEVIMI</h1>

      <div className="books" >
        {books.map((book) => ( 
          <div className="book" key={book.id}>
            {book.imagem && <img src={book.imagem} alt="" />}
            <h2>{book.nome}</h2> 
            <p>{book.descricao}</p>
            <span>{book.preco_unitario}</span>
            <button className="delete" onClick={() => handleDelete(book.id_produto)}>Delete</button>
            <button className="update">
              <Link
                to={`/gerenciarproduto/${book.id_produto}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

        <button> <Link to="/add">  Add new book </Link> </button>



    </div>
  );
  

};

export default Books;