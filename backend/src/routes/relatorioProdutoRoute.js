import express from "express";
import { getProdutosRelatorio } from "../controllers/relatorioProdutoController.js";

const router = express.Router();

router.post("/relatorio-produto", getProdutosRelatorio);

export default router;
