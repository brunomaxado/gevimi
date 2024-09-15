import express from "express";
import {
  addProduto,
  deleteProduto,
  getProduto,
  getAllProdutos,
  getProdutos,
  updateProduto,
} from "../controllers/produtoController.js";

const router = express.Router();

router.get("/books", getProdutos);
router.get("/allbooks", getAllProdutos);
router.get("/books/:id_produto", getProduto);
router.post("/books", addProduto);
router.delete("/books/:id_produto", deleteProduto);
router.put("/books/:id_produto", updateProduto);

export default router;
