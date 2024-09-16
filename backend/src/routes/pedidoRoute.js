import express from "express";
import {
  addPedido,
  deletePedido,
  getPedido,
  getPedidos,
  updatePedido,
  finalizaPedido
} from "../controllers/PedidoController.js";

const router = express.Router();

router.get("/pedido", getPedidos);
router.get("/pedido/:id_pedido", getPedido);
router.post("/pedido", addPedido);
router.delete("/pedido/:id_pedido", deletePedido);
router.put("/pedido/:id_pedido", finalizaPedido);


export default router;
