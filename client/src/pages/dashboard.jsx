import axios from "axios";
import '../dash.css';
import PaidIcon from '@mui/icons-material/Paid';
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);
  const [inicioPeriodo, setInicioPeriodo] = useState("");
  const [fimPeriodo, setFimPeriodo] = useState("");
  const navigate = useNavigate(); // Hook para navegação

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("http://localhost:8800/dashboard", {
        params: { inicioPeriodo, fimPeriodo }
      });
      setDashboard(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Erro ao buscar dados do dashboard:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleFilter = () => {
    setLoading(true);
    fetchDashboardData();
  };

  const handleClearFilter = () => {
    setInicioPeriodo("");
    setFimPeriodo("");
    fetchDashboardData();
  };

  const handleCreateReport = () => {
    navigate('/relatorio/pedido'); // Navega para a página de relatório
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div> 
      <h1>Estatísticas por período de tempo</h1>
      <div className="background-yellow2">
        <div className="filters-container">
          {/* Filtros de Período e Data */}
          <div>
            <label>Data de início: <span className="asterisco">*</span></label>
            <TextField
              type="datetime-local"
              value={inicioPeriodo}
              onChange={(e) => setInicioPeriodo(e.target.value)}
              name="inicioPeriodo"
              variant="standard"
              style={{ marginBottom: '20px', width: '300px' }}
            />
          </div>

          <div>
            <label>Data de fim: <span className="asterisco">*</span></label>
            <TextField
              type="datetime-local"
              value={fimPeriodo}
              onChange={(e) => setFimPeriodo(e.target.value)}
              name="fimPeriodo"
              variant="standard"
              style={{ marginBottom: '20px', width: '300px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="contained" color="primary" onClick={handleFilter}>
              Filtrar
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClearFilter}>
              Limpar Filtro
            </Button>
            <Button variant="contained" color="success" onClick={handleCreateReport}>
              Criar Relatório
            </Button>
          </div>
        </div>
      </div>

      <div className="background-yellow">
        <div className="container-dash-pai">
          <div className="container-dash"> 
            <div className="kpi-card-fat">
              <span className="card-value">R${dashboard.totalPrice?.toFixed(2) || "0.00"}</span>
              <span className="card-text">Faturamento</span>
            </div>
          </div>
          <div className="container-dash"> 
            <div className="kpi-card grey-dark">
              <span className="card-value">{dashboard.totals?.total_finalizado || 0}</span>
              <span className="card-text">Total Finalizados</span>
            </div>
            <div className="kpi-card red">
              <span className="card-value">{dashboard.totals?.total_aberto || 0}</span>
              <span className="card-text">Total Abertos</span>
            </div>
            <div className="kpi-card orange">
              <span className="card-value">{dashboard.totals?.total_retirada || 0}</span>
              <span className="card-text">Nº Comum</span>
            </div>
            <div className="kpi-card purple">
              <span className="card-value">{dashboard.totals?.total_entrega || 0}</span>
              <span className="card-text">Nº Entregas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
