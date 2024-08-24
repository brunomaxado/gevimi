// models/produtoModel.js
import db from "../config/db.js";

export const getAllPedidos = (callback) => {
  const q = "SELECT * FROM pedidos";
  db.query(q, callback);
};

export const getPedidoById = (id, callback) => {
  const q = "SELECT * FROM produto WHERE id_pedido= ?";
  
  db.query(q, [id], callback);
};

export const createProduto = (data, callback) => {
  const q = `INSERT INTO produto(nome, descricao, promocao, preco_desconto, preco_unitario, imagem, fk_id_categoria) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    data.nome,
    data.descricao,
    data.promocao,
    data.preco_desconto,
    data.preco_unitario,
    data.imagem,
    data.fk_id_categoria,
  ];
  db.query(q, values, callback);
};

export const updateProduto = (id, data, callback) => {
  const q = `
    UPDATE produto SET 
      nome = ?, 
      descricao = ?, 
      promocao = ?, 
      preco_desconto = ?, 
      preco_unitario = ?, 
      imagem = ?, 
      fk_id_categoria = ?
    WHERE id_produto = ?
  `;
  const values = [
    data.nome,
    data.descricao,
    data.promocao,
    data.preco_desconto,
    data.preco_unitario,
    data.imagem,
    data.fk_id_categoria,
  ];
  db.query(q, [...values, id], callback);
};

export const deleteProduto = (id, callback) => {
  const q = "DELETE FROM produto WHERE id_produto = ?";
  db.query(q, [id], callback);
};
