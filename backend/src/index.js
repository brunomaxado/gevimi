import express from "express";
import cors from "cors";
import mysql from "mysql"
import produtoRoute from "./routes/produtoRoute.js";
import categoriaRoute from "./routes/categoriaRoute.js";
import clienteRoute from "./routes/clienteRoute.js";
import userRoute from "./routes/userRoute.js";
import pedidoRoute from "./routes/pedidoRoute.js";
import dashRoute from "./routes/dashRoute.js";
import relatorioPedidoRoutes from "./routes/relatorioPedidoRoute.js"
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true, 
  }));
app.use(express.json());
app.use(cookieParser());

app.use(produtoRoute);
app.use(categoriaRoute);
app.use(clienteRoute);
app.use(userRoute);
app.use(pedidoRoute);
app.use(dashRoute);
app.use(relatorioPedidoRoutes)
app.listen(8800, () => {
    console.log("Conectado ao backend route/controller");
});

