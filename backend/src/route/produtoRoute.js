import express from "express";
import produtoController from "../controllers/produtoController.js";

const router = express.Router();

router.get("/books", showProdutos);
router.get("/books/:id_produto", showProdutoById);
router.post("/books", createProduto);
router.put("/books/:id_produto", updateProdutoById);
router.delete("/books/:id_produto", deleteProdutoById);

export default router;
