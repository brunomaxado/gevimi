import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {

    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
      });

      const navigate = useNavigate();
      const [error,setError] = useState(false)

      const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };




      const handleClick = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:8800/books", book);
          console.log("EXECUTEI");
          navigate("/");
        } catch (err) {
          console.log(err);
         // setError(true)
        }
      };




  return (
    <div>
<div className="form">
<h1>Add New Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name= "title"
        onChange={handleChange}
      /> 
    <input
        type="text"
        placeholder="desc"
        name= "desc"
        onChange={handleChange}
      /> 
      <input
        type="number"
        placeholder="price"
        name= "price"
        onChange={handleChange}
      /> 
      <input
        type="text"
        placeholder="cover"
        name= "cover"
        onChange={handleChange}
      /> 
    <button onClick = {handleClick}> add </button>
</div>
    </div>
  )
}

export default Add