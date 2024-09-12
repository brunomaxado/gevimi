import express from "express";
import cors from "cors";
import mysql from "mysql"
import produtoRoute from "./routes/produtoRoute.js";
import categoriaRoute from "./routes/categoriaRoute.js";
import clienteRoute from "./routes/clienteRoute.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin: "http://localhost:3000", // endereço do seu front-end
    credentials: true, // permite envio de cookies
  }));
app.use(express.json());
app.use(cookieParser());

app.use(produtoRoute);
app.use(categoriaRoute);
app.use(clienteRoute);
app.use(userRoute);

app.listen(8800, () => {
    console.log("Conectado ao backend route/controller");
});


