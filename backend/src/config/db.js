import mysql from "mysql2";  // Altere para 'mysql2'
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

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        process.exit(1);
    }
    console.log("Conectado ao banco de dados MySQL");
});

export default db;

