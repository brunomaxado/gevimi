import express from "express";
import {
  addCliente,
  deleteCliente,
  getCliente,
  getClientes,
  updateCliente,
} from "../controllers/clienteController.js";

const router = express.Router();

router.get("/cliente", getClientes);
router.get("/cliente/:id_cliente", getCliente);
router.post("/cliente", addCliente);
router.delete("/cliente/:id_cliente", deleteCliente);
router.put("/cliente/:id_cliente", updateCliente);

export default router;
