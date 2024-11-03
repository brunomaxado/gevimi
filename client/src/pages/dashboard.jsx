import axios from "axios";
import React, { useState, useEffect } from "react";
import CurrencyInput from 'react-currency-input-field'; // Importando a biblioteca

// Estilos para o dashboard
const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '50px',
    justifyContent: 'center'
  },
  card: {
    flex: '1 1 calc(33% - 20px)',
    minWidth: '250px',
    padding: '20px',
    borderRadius: '8px',
    color: 'white',
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  totalRetirada: { backgroundColor: '#4CAF50' }, // Green
  totalEntregas: { backgroundColor: '#2196F3' }, // Blue
  totalAbertos: { backgroundColor: '#FFC107' }, // Yellow
  totalFinalizados: { backgroundColor: '#9C27B0', flex: '1 1 calc(66% - 20px)' }, // Purple, ocupa o espaço de dois cartões
  faturamento: { backgroundColor: '#FF9800', flex: '1 1 calc(66% - 20px)' }, // Amber, ocupa o espaço de dois cartões
};

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get("http://localhost:8800/dashboard");
        console.log('API Response:', response.data); // Verifique a resposta
        setDashboard(response.data);
        setLoading(false); // Defina o estado de carregamento como false quando os dados forem carregados
      } catch (err) {
        console.log('API Error:', err); // Verifique o erro
        setLoading(false); // Defina o estado de carregamento como false em caso de erro
      }
    };

    fetchDashboard();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div> 
    
    <div style={styles.container}>
      <div style={{ ...styles.card, ...styles.totalRetirada }}>
        <div>Total Entrega</div>
        <div>{dashboard.totals?.total_retirada || 0}</div>
      </div>
      <div style={{ ...styles.card, ...styles.totalEntregas }}>
        <div>Total Retirada</div>
        <div>{dashboard.totals?.total_entrega || 0}</div>
      </div>
      <div style={{ ...styles.card, ...styles.totalAbertos }}>
        <div>Total Finalizados</div>
        <div>{dashboard.totals?.total_aberto || 0}</div>
      </div>
      <div style={{ ...styles.card, ...styles.faturamento }}>
        <div>Faturamento</div>
        <div>R${dashboard.totalPrice?.toFixed(2) || "0.00"}</div>
      </div>
      <div style={{ ...styles.card, ...styles.totalFinalizados }}>
        <div>Total Abertos</div>
        <div>{dashboard.totals?.total_finalizado || 0}</div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
