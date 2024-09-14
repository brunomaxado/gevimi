import express from "express";
import {
  addPedido,
  deletePedido,
  getPedido,
  getPedidos,
  updatePedido,
} from "../controllers/PedidoController.js";

const router = express.Router();

router.get("/pedido", getPedidos);
router.get("/pedido/:id_produto", getPedido);
router.post("/pedido", addPedido);
router.delete("/pedido/:id_produto", deletePedido);
router.put("/pedido/:id_produto", updatePedido);

export default router;
