import axios from "axios";
import '../dash.css';
import PaidIcon from '@mui/icons-material/Paid';
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
  PieController
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importando o plugin de rótulos
import { useNavigate } from 'react-router-dom'; // Hook de navegação para React Router v6

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
  
  const [clientes, setClientes] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null); // Ref para o canvas do gráfico de barras
  const chartInstanceRef = useRef(null); // Ref para o gráfico ChartJS
  const pieChartRef = useRef(null); // Ref para o gráfico de pizza
  const pieChartInstanceRef = useRef(null); // Ref para o gráfico de pizza
  const navigate = useNavigate(); // Hook para navegação

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
    const fetchAllClientes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/cliente");
        setClientes(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllClientes();
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
  
      // Dados do gráfico com o id_cliente incluído
      const chartData = dashboard.clientePorPedido.map(item => ({
        cliente: item.nome,
        numPedidos: item.num_pedido,
        idCliente: item.id_cliente // Adiciona o id_cliente diretamente aqui
      }));
  
      const newChart = new ChartJS(chartRef.current, {
        type: 'bar',
        data: {
          labels: chartData.map(row => row.cliente),
          datasets: [
            {
              label: 'Número de Pedidos por Cliente',
              data: chartData.map(row => row.numPedidos),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: { enabled: true },
            datalabels: {
              color: '#000',
              anchor: 'end',
              align: 'top',
              font: { weight: 'bold', size: 14 },
            },
          },
          scales: {
            y: { type: 'linear', beginAtZero: true },
          },
          onClick: (event, chartElements) => {
            if (chartElements.length > 0) {
              const index = chartElements[0].index;
              const clienteId = chartData[index].idCliente; // Obtém o id_cliente diretamente
  
              if (clienteId) {
                navigate(`/editarCliente/${clienteId}`); // Redireciona com o id_cliente
              } else {
                console.log('Cliente não encontrado');
              }
            }
          }
        }
      });
  
      chartInstanceRef.current = newChart;
    } else {
      console.log("Canvas não encontrado ou dados de clientes ausentes.");
    }
  }, [dashboard, navigate]); // Não precisa mais de 'clientes' como dependência
  

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
    <div className="background-yellow">
     <div class="container-dash-pai">
  <div class="row">
    <div class="item-1">Item 1 - Esticado na linha inteira</div>
  </div>

  <div class="row">
    <div class="column">

    <div class="kpi-card grey-dark">
    <span class="card-value">          <div>{dashboard.totals?.total_finalizado || 0}</div> </span>
    <span class="card-text">Total Finalizados</span>
             <i class="fas fa-shopping-cart icon"> <PaidIcon> </PaidIcon></i>
  </div>
  


  <div class="kpi-card red">
    <span class="card-value">            <div>{dashboard.totals?.total_aberto|| 0}</div> </span>
    <span class="card-text">Total Abertos</span>
      <i class="fas fa-shopping-cart icon"></i>
  </div>


    </div>
    

    <div style={{ width: '100%', maxWidth: '21%', backgroundColor: 'white', padding: '20px' }}>
  <canvas ref={pieChartRef} id="totals" style={{ height: '200px', width: '100%' }} />
</div>



  </div>
</div>



    <div className="container-dash"> 

    <div class="kpi-card-fat">
    <span class="card-value">   <div>R${dashboard.totalPrice?.toFixed(2) || "0.00"}</div> </span>
    <span class="card-text">Faturamento</span>
      <i class="fas fa-shopping-cart icon"></i>
  </div>

    </div>
    <div className="container-dash"> 


  <div class="kpi-card orange">
    <span class="card-value">  <div>{dashboard.totals?.total_retirada || 0}</div></span>
    
    <span class="card-text">Nº Comum</span>
     <i class="fas fa-shopping-cart icon"> <PaidIcon> </PaidIcon></i>
  </div>
 
 
    <div class="kpi-card purple">
    <span class="card-value">             <div>{dashboard.totals?.total_entrega || 0}</div> </span>
    <span class="card-text">Nº Entregas</span>
       <i class="fas fa-shopping-cart icon"></i>
  </div>
  
  </div>

    <div className="container-dash"> 
    <div class="kpi-card grey-dark">
    <span class="card-value">          <div>{dashboard.totals?.total_finalizado || 0}</div> </span>
    <span class="card-text">Total Finalizados</span>
             <i class="fas fa-shopping-cart icon"> <PaidIcon> </PaidIcon></i>
  </div>
  


  <div class="kpi-card red">
    <span class="card-value">            <div>{dashboard.totals?.total_aberto|| 0}</div> </span>
    <span class="card-text">Total Abertos</span>
      <i class="fas fa-shopping-cart icon"></i>
  </div>
</div>
 
      
      
      <div style={{ width: '100%', maxWidth: '800px', margin: '50px auto' }}>
        <canvas ref={chartRef} id="acquisitions" style={{ height: '200px', width: '100%' }} />
      </div>

      


    </div>
  );
};

export default Dashboard;

