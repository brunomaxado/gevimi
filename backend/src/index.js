import express from "express";
import cors from "cors";
import mysql from "mysql"
import produtoRoute from "./routes/produtoRoute.js";
import categoriaRoute from "./routes/categoriaRoute.js";
import clienteRoute from "./routes/clienteRoute.js";
import userRoute from "./routes/userRoute.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use(produtoRoute);
app.use(categoriaRoute);
app.use(clienteRoute);
app.use(userRoute);
app.listen(8800, () => {
    console.log("Conectado ao backend route/controller");
});


