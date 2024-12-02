import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import "jspdf-autotable";
import LOGO_BASE64 from "./logo";
import { useModified } from "../context/ModifiedContext";
import { AuthContext } from "../context/authContext";

const RelatorioProduto = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = (e) => {
      e.preventDefault();
      navigate(-1); // Navega para a página anterior
    };
    const getFirstDayOfMonth = () => {
        const date = new Date();
        date.setDate(1);
        date.setHours(0, 0, 0, 0);
        return new Date(date - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };
    const { isModified, setIsModified } = useModified(); // Acessando o contexto
    const getLastDayOfMonth = () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        date.setHours(23, 59, 59, 999);
        return new Date(date - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: value, // Atualiza o valor do campo com base no nome
        }));
        setIsModified(true); // Marca o formulário como modificado
      };
      useEffect(() => {
        // Reseta isModified ao desmontar o componente
        return () => {
          setIsModified(false);
        };
      }, [setIsModified]);
    
    const [filters, setFilters] = useState({
        inicioPeriodo: getFirstDayOfMonth(),
        fimPeriodo: getLastDayOfMonth(),
    });

    const [produtos, setProdutos] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    console.log(isModified);
    const handleGenerateReport = async () => {
        if (!filters.inicioPeriodo || !filters.fimPeriodo) {
            setErrorMessage("Por favor, preencha ambas as datas.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8800/relatorio-produto", { filters });
            setProdutos(response.data);
            setErrorMessage("");
            generatePDF(response.data);
        } catch (error) {
            console.error("Erro ao gerar o relatório:", error);
            setErrorMessage("Erro ao buscar dados do relatório.");
        }
    };

    const formatDate = (date, includeTime = false) => {
        if (!date) return "Sem data";
        const d = new Date(date);
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        if (includeTime) {
            options.hour = "2-digit";
            options.minute = "2-digit";
        }
        return d.toLocaleString("pt-BR", options);
    };

    const generatePDF = (data) => {
        const doc = new jsPDF();
        doc.addImage(LOGO_BASE64, "PNG", 14, 10, 30, 30);
        doc.setFontSize(18);
        doc.text("Business VIMI", 50, 20);
        doc.setFontSize(11);
        doc.text("Relatório de Produtos", 50, 28);


        const emissionDate = formatDate(new Date(), true);

        doc.text(`Emitido por: ${currentUser.nome || "Usuário desconhecido"}`, 50, 35);
        doc.text(`Data de Emissão: ${emissionDate}`, 50, 40);

        const periodoInicio = formatDate(filters.inicioPeriodo, true);
        const periodoFim = formatDate(filters.fimPeriodo, true);
        doc.text(`Período Solicitado: ${periodoInicio} até ${periodoFim}`, 14, 45);

        const tableData = data.map((produto) => [
            produto.produto || "Produto desconhecido",
            produto.quantidade_vendida || 0,
            produto.numero_vendas || 0,
            produto.valor_total ? `R$ ${produto.valor_total.toFixed(2)}` : "R$ 0,00",
            formatDate(produto.ultima_venda, true),
        ]);

        doc.autoTable({
            head: [["Produto", "Qtd. Vendida", "Nº Vendas", "Valor Total (R$)", "Última Venda"]],
            body: tableData,
            startY: 50,
            styles: { fontSize: 10, halign: "left", valign: "middle" },
            headStyles: { fillColor: [242, 203, 87], textColor: [0, 0, 0] },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            columnStyles: {
                3: { halign: "right" }, // Alinha os valores na coluna de total à direita
            },
        });

        doc.save("relatorio_produtos.pdf");
    };

    return (
        <div>
            <h1>Relatório de Produtos</h1>
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            <div className="filter-container-pai" style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "fit-content" }}>
                    <label>
                        Data Início: <span className="asterisco">*</span>
                    </label>
                    <TextField
                        variant="standard"
                        type="datetime-local"
                        value={filters.inicioPeriodo}
                        onChange={handleChange} // Usando a função handleChange
                        sx={{ width: "200px" }} // Define largura padrão
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "fit-content" }}>
                    <label>
                        Data Fim: <span className="asterisco">*</span>
                    </label>
                    <TextField
                        variant="standard"
                        type="datetime-local"
                        value={filters.fimPeriodo}
                         onChange={handleChange} // Usando a função handleChange
                        sx={{ width: "200px" }} // Define largura padrão
                    />
                </div>
            </div>
            <div className="actions" style={{ marginTop: "20px", gap: "30px"}}>
            <button className="voltar" onClick={handleClick}>
                Voltar
            </button>
            <button className="gerar-relatorio-produto" onClick={handleGenerateReport}>
                Gerar Relatório
            </button>
       
            </div>
            
        </div>
    );
};

export default RelatorioProduto;
