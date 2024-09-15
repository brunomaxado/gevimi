import express from "express";
import {
  addCategoria,
  deleteCategoria,
  getAllCategoria,
  getCategoria,
  getCategorias,
  updateCategoria,
} from "../controllers/categoriaController.js";

const router = express.Router();

router.get("/categoria", getCategorias);
router.get("/allcategoria", getAllCategoria);
router.get("/categoria/:id_categoria", getCategoria);
router.post("/categoria", addCategoria);
router.delete("/categoria/:id_categoria", deleteCategoria);
router.put("/categoria/:id_categoria", updateCategoria);

export default router;
