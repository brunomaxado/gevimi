import db from "../config/database.js";

export const getAllProdutos = (result) => {
    const q = "SELECT * FROM produto";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, data);
    });
};

export const getProdutoById = (id_produto, result) => {
    const q = "SELECT * FROM produto WHERE id_produto = ?";
    db.query(q, [id_produto], (err, data) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, data[0]);
    });
};

export const insertProduto = (newProduto, result) => {
    const q = "INSERT INTO produto SET ?";
    db.query(q, newProduto, (err, data) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, data);
    });
};

export const updateProduto = (id_produto, updatedProduto, result) => {
    const q = "UPDATE produto SET ? WHERE id_produto = ?";
    db.query(q, [updatedProduto, id_produto], (err, data) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, data);
    });
};

export const deleteProduto = (id_produto, result) => {
    const q = "DELETE FROM produto WHERE id_produto = ?";
    db.query(q, [id_produto], (err, data) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        result(null, data);
    });
};
