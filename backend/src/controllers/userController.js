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

    // Inclui o campo 'administrador' no insert
    const q = "INSERT INTO usuario(`nome`, `login`, `senha`, `administrador`) VALUES (?)";
    const values = [req.body.nome, req.body.login, hash, req.body.administrador]; // Incluindo o valor para administrador

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Usuário Criado.");
    });
  });
};

 
  export const login = (req, res) => {
    
  
    const q = "SELECT * FROM usuario WHERE login = ?";
  
    db.query(q, [req.body.login], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("Usuário não encontrado!");
  
    
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.senha,
        data[0].senha
      );
  
      if (!isPasswordCorrect)
        return res.status(400).json("Senha incorreta!");
  
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
    }).status(200).json("Usuário desconectado.")
  };

  export const getUsuario= (req, res) => {
    
    
    
    const q = "SELECT * FROM usuario";
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
  };



  export const getUsuarios = (req, res) => {
    const usuarioId = req.params.id_usuario; // Obtém o ID do usuário dos parâmetros da rota
  
    if (!usuarioId) {
      return res.status(400).json({ message: "ID do usuário não fornecido." });
    }
  
    // Consulta SQL para buscar o usuário pelo ID
    const q = "SELECT * FROM usuario WHERE id_usuario = ?";
  
    db.query(q, [usuarioId], (err, data) => {
      if (err) return res.status(500).json({ message: "Erro no servidor", error: err }); // Retorna erro de servidor
  
      if (data.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado." }); // Retorna 404 se o usuário não for encontrado
      }
  
      return res.status(200).json(data[0]); // Retorna os dados do usuário encontrado
    });
  };
  

  export const getAllUsuario= (req, res) => {
    
  
  };

  export const  deleteUsuario= (req, res) => {
  
  };


  export const alterarSenha = (req, res) => {
    const { id_usuario, senhaAntiga, senhaNova } = req.body;
  
    // Verifique se a nova senha é diferente da antiga
    if (senhaAntiga === senhaNova) {
      return res.status(400).json("A nova senha deve ser diferente da antiga.");
    }
  
    // Primeiro, pegue o usuário do banco de dados pelo id
    const q = "SELECT * FROM usuario WHERE id_usuario = ?";
  
    db.query(q, [id_usuario], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("Usuário não encontrado!");
  
      const usuario = data[0];
  
      // Verifica se a senha antiga está correta
      const isPasswordCorrect = bcrypt.compareSync(senhaAntiga, usuario.senha);
      if (!isPasswordCorrect) {
        return res.status(400).json("Senha antiga incorreta!");
      }
  
      // Gera o hash da nova senha
      const salt = bcrypt.genSaltSync(10);
      const hashSenhaNova = bcrypt.hashSync(senhaNova, salt);
  
      // Atualiza a senha no banco de dados
      const updateQuery = "UPDATE usuario SET senha = ? WHERE id_usuario = ?";
      db.query(updateQuery, [hashSenhaNova, id_usuario], (err, result) => {
        if (err) return res.status(500).json(err);
  
        return res.status(200).json("Senha alterada com sucesso.");
      });
    });
  };
  