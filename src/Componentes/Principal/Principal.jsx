import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col } from 'antd';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import MigajasdePan from './MigajasdePan';
import MenuLateral from './MenuLateral';
import MenuSuperior from './MenuSuperior';
import './Principal.css';

// Registrar escalas y elementos para los gráficos
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const { Content, Sider } = Layout;

const Principal = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [infoMicorrizas, setInfoMicorrizas] = useState('');
  const [imagenMicorrizas, setImagenMicorrizas] = useState('');

  // Migajas de Pan
  const [migajas, setMigajas] = useState([
    { nombre: "Micorrizas", ruta: '' },
  ]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Obtener información desde Wikipedia sobre las micorrizas
  useEffect(() => {
    const obtenerInfoMicorrizas = async () => {
      try {
        const response = await fetch('https://es.wikipedia.org/api/rest_v1/page/summary/Micorriza');
        const data = await response.json();
        setInfoMicorrizas(data.extract); // Descripción de las micorrizas
        setImagenMicorrizas(data.thumbnail?.source); // Imagen relevante
      } catch (error) {
        console.error('Error al obtener datos de Wikipedia:', error);
      }
    };

    obtenerInfoMicorrizas();
  }, []);

  // Datos ficticios para el gráfico de uso de micorrizas
  const dataUsoMicorrizas = {
    labels: ['2018', '2019', '2020', '2021', '2022'],
    datasets: [
      {
        label: 'Incremento del uso de Micorrizas (%)',
        data: [10, 20, 30, 45, 60],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  // Datos ficticios para el gráfico comparativo de rendimiento agrícola
  const dataRendimientoAgricola = {
    labels: ['Maíz', 'Trigo', 'Arroz', 'Soya', 'Tomate'],
    datasets: [
      {
        label: 'Con Micorrizas',
        data: [80, 85, 90, 75, 95],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Sin Micorrizas',
        data: [60, 65, 70, 55, 80],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Menú lateral */}
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <MenuLateral expanded={!collapsed} />
      </Sider>

      <Layout>
        {/* Menú superior */}
        <MenuSuperior />

        {/* Contenido principal */}
        <Content style={{ margin: '16px' }}>
          <Row className="mb-2">
            <Col>
              <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Micorrizas: Beneficios y Usos</h1>
              <MigajasdePan paginas={migajas} />
            </Col>
          </Row>

          {/* Información detallada sobre Micorrizas */}
          <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
            <Col span={24}>
              <Card title="¿Qué son las Micorrizas?" style={{ textAlign: 'left' }}>
                {imagenMicorrizas && <img src={imagenMicorrizas} alt="Micorrizas" style={{ width: '100%', maxWidth: '400px', marginBottom: '20px' }} />}
                <p>{infoMicorrizas ? infoMicorrizas : 'Cargando información sobre las micorrizas...'}</p>
                <p>
                  Las micorrizas son asociaciones simbióticas entre hongos y las raíces de plantas. En esta simbiosis, los hongos facilitan la absorción de agua
                  y nutrientes, como el fósforo, mientras que las plantas suministran azúcares y otros productos fotosintéticos a los hongos. Estas asociaciones 
                  son fundamentales en muchos ecosistemas naturales y agrícolas, ayudando a las plantas a crecer en condiciones adversas.
                </p>
                <p>
                  Los beneficios de las micorrizas incluyen:
                  <ul>
                    <li>Mejor absorción de nutrientes, especialmente fósforo.</li>
                    <li>Mayor resistencia a la sequía y enfermedades.</li>
                    <li>Mejora la estructura del suelo.</li>
                    <li>Favorece el establecimiento de las plantas en suelos pobres.</li>
                  </ul>
                </p>
              </Card>
            </Col>
          </Row>

          {/* Gráfico sobre el uso de micorrizas en la agricultura */}
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Incremento del uso de Micorrizas en la Agricultura" style={{ textAlign: 'center' }}>
                <Line data={dataUsoMicorrizas} />
              </Card>
            </Col>
          </Row>

          {/* Gráfico comparativo de rendimiento con y sin micorrizas */}
          <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            <Col span={24}>
              <Card title="Rendimiento Agrícola con y sin Micorrizas" style={{ textAlign: 'center' }}>
                <Bar data={dataRendimientoAgricola} />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Principal;
