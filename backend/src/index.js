import express from "express";
import cors from "cors";
import mysql from "mysql2";
import produtoRoute from "./routes/produtoRoute.js";
import categoriaRoute from "./routes/categoriaRoute.js";
import clienteRoute from "./routes/clienteRoute.js";
import userRoute from "./routes/userRoute.js";
import pedidoRoute from "./routes/pedidoRoute.js";
import dashRoute from "./routes/dashRoute.js";
import relatorioPedidoRoutes from "./routes/relatorioPedidoRoute.js";
import cookieParser from "cookie-parser";
import fs from "fs";

const db = mysql.createConnection({
  host: "mysql-gevimi-gevimiuepg2024-35f2.l.aivencloud.com",
  port: 24717,
  user: "avnadmin",
  password: "AVNS__QMrdagNxJ0s99UlzDt",
  database: "gevimi",
  ssl: {
      ca: fs.readFileSync("../ca.pem"),  // Certificado CA
      rejectUnauthorized: true,
  }
});
// Criar o servidor Express
const app = express();

// Configuração CORS
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


