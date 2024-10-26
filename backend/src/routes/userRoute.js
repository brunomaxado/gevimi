import express from "express";
import { register, login, logout, getUsuario, deleteUsuario, getUsuarios, getAllUsuario, alterarSenha , alterarUsuario} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/usuario:id_usuario", logout);
router.post("/logout", logout);
router.get("/usuario",getUsuario);
router.get("/usuario/:id_usuario",getUsuarios);
router.delete("/usuario/:id_usuario",deleteUsuario);
router.get("/allusuarioid_usuario",getAllUsuario);
router.put("/alterarsenha", alterarSenha);
router.put("/editarusuario/:id_usuario", alterarUsuario);
export default router;