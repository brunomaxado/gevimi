import express from "express";
import cors from "cors";
import produtoRoutes from "./routes/produtoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(produtoRoutes);

app.listen(8800, () => {
    console.log("Conectado ao backend gevimi");
});
