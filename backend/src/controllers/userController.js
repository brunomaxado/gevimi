import  db  from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    
    
    
    const q = "SELECT * FROM usuario WHERE login = ?";
  
    db.query(q, [req.body.login], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists!");
  
    
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.senha, salt);
  
      const q = "INSERT INTO usuario(`nome`,`login`,`senha`) VALUES (?)";
      const values = [req.body.nome, req.body.login, hash];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      });
    });
  };

 
  export const login = (req, res) => {
    
  
    const q = "SELECT * FROM usuario WHERE login = ?";
  
    db.query(q, [req.body.login], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");
  
    
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.senha,
        data[0].senha
      );
  
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong login or password!");
  
      const token = jwt.sign({ id: data[0].id_usuario }, "jwtkey");
      const { senha, ...other } = data[0];
  
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(other);
    });
  };
  
  
  export const logout = (req, res) => {
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("User has been logged out.")
  };

  export const getUsuario= (req, res) => {
    
    
    
    const q = "SELECT * FROM usuario";
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
  };



  export const getUsuarios= (req, res) => {
  
  };

  export const getAllUsuario= (req, res) => {
    
  
  };

  export const  deleteUsuario= (req, res) => {
  
  };
