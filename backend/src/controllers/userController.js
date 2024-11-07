import  db  from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = (req, res) => {
  const q = "SELECT * FROM usuario WHERE login = ?";

  db.query(q, [req.body.login], (err, data) => {
    if (err) return res.status(500).json({ message: "Erro interno do servidor." });
    if (data.length) return res.status(409).json({ message: "Login já cadastrado!" });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.senha, salt);

    const q = "INSERT INTO usuario(`nome`, `login`, `senha`, `administrador`) VALUES (?)";
    const values = [req.body.nome, req.body.login, hash, req.body.administrador];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json({ message: "Erro ao criar o usuário." });
      return res.status(200).json({ message: "Usuário Criado." });
    });
  });
};

 
  export const login = (req, res) => {
    
  
    const q = "SELECT * FROM usuario WHERE login = ?";
  
    db.query(q, [req.body.login], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("Usuário ou Senha incorreto!");
  
    
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.senha,
        data[0].senha
      );
  
      if (!isPasswordCorrect)
        return res.status(400).json("Usuário ou Senha incorreto!");
  
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
  export const deleteUsuario = (req, res) => {
    const { id_usuario } = req.params; // Obtém o ID do usuário dos parâmetros da rota
  
    // Primeiro, verifique se o usuário está associado a algum pedido
    const checkOrdersQuery = "SELECT * FROM pedido WHERE fk_id_usuario = ?";
    
    db.query(checkOrdersQuery, [id_usuario], (err, results) => {
      if (err) return res.status(500).json({ message: "Erro ao verificar pedidos", error: err });
      
      if (results.length > 0) {
        return res.status(400).json({ message: "Não é possível deletar o usuário porque ele está associado a um ou mais pedidos." });
      }
      
      // Se não houver pedidos, proceda com a exclusão do usuário
      const deleteQuery = "DELETE FROM usuario WHERE id_usuario = ?";
      
      db.query(deleteQuery, [id_usuario], (err, result) => {
        if (err) return res.status(500).json({ message: "Erro ao deletar usuário", error: err });
        
        // Verifica se alguma linha foi afetada (se o usuário foi encontrado e deletado)
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Usuário não encontrado." });
        }
        
        return res.status(200).json({ message: "Usuário deletado com sucesso." });
      });
    });
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
  export const alterarUsuario = (req, res) => {
    const { id_usuario } = req.params; // Obtém o ID do usuário dos parâmetros da rota
    const { nome, login, administrador } = req.body; // Obtém os dados enviados na requisição
  
    // Verifica se todos os campos necessários foram fornecidos
    if (!nome || !login || administrador === undefined) {
      return res.status(400).json("Os campos Nome, Login e Administrador são obrigatórios.");
    }
  
    // Consulta SQL para atualizar os dados do usuário
    const q = `
      UPDATE usuario 
      SET nome = ?, login = ?, administrador = ? 
      WHERE id_usuario = ?
    `;
  
    const values = [nome, login, administrador, id_usuario];
  
    db.query(q, values, (err, result) => {
      if (err) return res.status(500).json({ message: "Erro ao atualizar usuário", error: err });
  
      // Verifica se alguma linha foi afetada (se o usuário foi encontrado e atualizado)
      if (result.affectedRows === 0) {
        return res.status(404).json("Usuário não encontrado.");
      }
  
      return res.status(200).json("Usuário atualizado com sucesso.");
    });
  };
  
  export const updateSenha = (req, res) => {
    const { id_usuario, senhaNova } = req.body; // Obtém o id do usuário e a nova senha
  
    if (!senhaNova) {
      return res.status(400).json("A nova senha é obrigatória.");
    }
  
    // Gera o hash da nova senha
    const salt = bcrypt.genSaltSync(10);
    const hashSenhaNova = bcrypt.hashSync(senhaNova, salt);
  
    // Consulta SQL para atualizar a senha do usuário
    const updateQuery = "UPDATE usuario SET senha = ? WHERE id_usuario = ?";
  
    db.query(updateQuery, [hashSenhaNova, id_usuario], (err, result) => {
      if (err) return res.status(500).json({ message: "Erro ao atualizar senha", error: err });
  
      // Verifica se alguma linha foi afetada (se o usuário foi encontrado e a senha foi atualizada)
      if (result.affectedRows === 0) {
        return res.status(404).json("Usuário não encontrado.");
      }
  
      return res.status(200).json("Senha atualizada com sucesso.");
    });
  };
  