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

router.get("/readProduto", getProdutos);
router.get("/allprodutos", getAllProdutos);
router.get("/readProduto/:id_produto", getProduto);
router.post("/readProduto", addProduto);
router.delete("/readProduto/:id_produto", deleteProduto);
router.put("/readProduto/:id_produto", updateProduto);

export default router;
