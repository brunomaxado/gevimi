import express from "express";
import {
  addPedido,
} from "../controllers/pedidoController.js";

const router = express.Router();


router.post("/pedido", addPedido);


export default router;
