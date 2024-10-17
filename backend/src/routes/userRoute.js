import express from "express";
import { register, login, logout, getUsuario, deleteUsuario, getUsuarios, getAllUsuario, alterarSenha } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/usuario:id", logout);
router.post("/logout", logout);
router.get("/usuario",getUsuario);
router.get("/usuario/:id",getUsuarios);
router.delete("/usuario/:id",deleteUsuario);
router.get("/allusuario",getAllUsuario);
router.put("/alterarsenha", alterarSenha);
export default router;