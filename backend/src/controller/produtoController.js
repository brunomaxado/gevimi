import {
    getAllProdutos,
    getProdutoById,
    insertProduto,
    updateProduto,
    deleteProduto,
} from "../models/produtoModel.js";

export const showProdutos = (req, res) => {

    getAllProdutos( (err, data) => {
        if (err) return res.status(500).send(err);
        res.json(data);
    });

};

export const showProdutoById = (req, res) => {
    getProdutoById(req.params.id_produto, (err, data) => {
        if (err) return res.status(500).send(err);
        if (!data) return res.status(404).json({ message: "Produto não encontrado" });
        res.json(data);
    });
};

export const createProduto = (req, res) => {
    const newProduto = req.body;
    
    insertProduto(newProduto, (err, data) => {
        if (err) return res.status(500).send(err);
        res.status(201).json(data);
    });
};

export const updateProdutoById = (req, res) => {
    const updatedProduto = req.body;
    updateProduto(req.params.id_produto, updatedProduto, (err, data) => {
        if (err) return res.status(500).send(err);
        res.json(data);
    });
};

export const deleteProdutoById = (req, res) => {
    deleteProduto(req.params.id_produto, (err, data) => {
        if (err) return res.status(500).send(err);
        res.json(data);
    });
};
