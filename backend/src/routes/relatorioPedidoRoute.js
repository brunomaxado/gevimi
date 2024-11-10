import express from "express";
import { getPedidosRelatorio } from "../controllers/relatorioPedidoController.js";

const router = express.Router();

// Alterando para POST, já que você está enviando filtros no corpo da requisição
router.post("/relatorio-pedido", getPedidosRelatorio);

export default router;
