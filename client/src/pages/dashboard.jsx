import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  ArcElement,
  PieController // Importando o controlador do gráfico de pizza
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importando o plugin de rótulos

// Registra as escalas, controladores, elementos e o plugin para os rótulos
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  ArcElement, // Registra o gráfico de pizza (ArcElement)
  PieController, // Registra o controlador de pizza
  ChartDataLabels // Registra o plugin de rótulos
);


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
  totalFinalizados: { backgroundColor: '#9C27B0', flex: '1 1 calc(66% - 20px)' }, // Purple
  faturamento: { backgroundColor: '#FF9800', flex: '1 1 calc(66% - 20px)' }, // Amber
};

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null); // Ref para o canvas do gráfico de barras
  const chartInstanceRef = useRef(null); // Ref para o gráfico ChartJS
  const pieChartRef = useRef(null); // Ref para o gráfico de pizza
  const pieChartInstanceRef = useRef(null); // Ref para o gráfico de pizza

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

  // Inicializando o gráfico de barras após o carregamento
  useEffect(() => {
    if (chartRef.current && dashboard.clientePorPedido) {
      // Destruir o gráfico existente, se houver
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      console.log("Canvas encontrado, criando gráfico...");

      // Dados do gráfico (cliente e número de pedidos)
      const chartData = dashboard.clientePorPedido.map(item => ({
        cliente: item.nome,
        numPedidos: item.num_pedido
      }));

      // Criando o gráfico de barras
      const newChart = new ChartJS(chartRef.current, {
        type: 'bar', // Gráfico de barras
        data: {
          labels: chartData.map(row => row.cliente), // Clientes no eixo X
          datasets: [
            {
              label: 'Número de Pedidos por Cliente',
              data: chartData.map(row => row.numPedidos), // Número de pedidos no eixo Y
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor de fundo das barras
              borderColor: 'rgba(75, 192, 192, 1)', // Cor da borda das barras
              borderWidth: 1,
            }
          ]
        },
        options: {
          responsive: true, // Gráfico responsivo
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true,
            },
            datalabels: {
              color: '#000', // Cor do texto
              anchor: 'end', // Posicionamento do rótulo
              align: 'top', // Alinhamento do rótulo
              font: {
                weight: 'bold',
                size: 14,
              },
            },
          },
          scales: {
            y: {
              type: 'linear', // Definir explicitamente a escala como 'linear'
              beginAtZero: true,
            }
          }
        }
      });

      // Armazenar a instância do gráfico para destruição futura
      chartInstanceRef.current = newChart;
    } else {
      console.log("Canvas não encontrado ou dados de clientes ausentes.");
    }
  }, [dashboard]); // Esse useEffect depende de `dashboard` para garantir que os dados sejam carregados

  // Inicializando o gráfico de pizza após o carregamento
  useEffect(() => {
    if (pieChartRef.current && dashboard.totals) {
      // Destruir o gráfico de pizza existente, se houver
      if (pieChartInstanceRef.current) {
        pieChartInstanceRef.current.destroy();
      }

      const { total_aberto, total_finalizado } = dashboard.totals;

      // Criando o gráfico de pizza
      const newPieChart = new ChartJS(pieChartRef.current, {
        type: 'pie', // Gráfico de pizza
        data: {
          labels: ['Total Aberto', 'Total Finalizado'],
          datasets: [
            {
              data: [total_aberto, total_finalizado], // Dados para o gráfico de pizza
              backgroundColor: ['#FF9800', '#9C27B0'], // Cores para as fatias
              borderColor: ['#FF9800', '#9C27B0'], // Bordas das fatias
              borderWidth: 1,
            }
          ]
        },
        options: {
          responsive: true, // Gráfico responsivo
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true,
            },
            datalabels: {
              color: '#fff', // Cor do texto
              font: {
                weight: 'bold',
                size: 14,
              },
            },
          }
        }
      });

      // Armazenar a instância do gráfico de pizza para destruição futura
      pieChartInstanceRef.current = newPieChart;
    } else {
      console.log("Canvas do gráfico de pizza não encontrado ou dados de totais ausentes.");
    }
  }, [dashboard]); // Esse useEffect depende de `dashboard` para garantir que os dados sejam carregados

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

      {/* Gráfico de Pedidos por Cliente */}
      <div style={{ width: '100%', maxWidth: '800px', margin: '50px auto' }}>
        <canvas ref={chartRef} id="acquisitions" style={{ height: '200px', width: '100%' }} />
      </div>

      {/* Gráfico de Pizza para Total Aberto e Finalizado */}
      <div style={{ width: '100%', maxWidth: '500px', margin: '50px auto' }}>
        <canvas ref={pieChartRef} id="pieChart" style={{ height: '300px', width: '100%' }} />
      </div>
    </div>
  );
};

export default Dashboard;
