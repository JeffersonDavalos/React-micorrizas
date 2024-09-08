import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col, Spin } from 'antd';
import { Line, Bar } from 'react-chartjs-2';
import MigajasdePan from './MigajasdePan';
import MenuLateral from './MenuLateral';
import MenuSuperior from './MenuSuperior';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar las escalas y elementos para los gráficos
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const { Content, Sider } = Layout;

const Principal = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [infoMicorrizas, setInfoMicorrizas] = useState('');
  const [imagenMicorrizas, setImagenMicorrizas] = useState('');
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  const toggleCollapsed = () => setCollapsed(!collapsed);

  // Funciones de mostrar y ocultar cargando
  const mostrarCargando = () => setLoading(true);
  const ocultarCargando = () => setLoading(false);

  // Obtener información desde Wikipedia sobre las micorrizas
  useEffect(() => {
    const obtenerInfoMicorrizas = async () => {
      try {
        mostrarCargando(); // Mostrar cargando al hacer la petición
        const response = await fetch('https://es.wikipedia.org/api/rest_v1/page/summary/Micorriza');
        const data = await response.json();
        setInfoMicorrizas(data.extract);
        setImagenMicorrizas(data.thumbnail?.source);
      } catch (error) {
        console.error('Error al obtener datos de Wikipedia:', error);
      } finally {
        ocultarCargando(); // Ocultar cargando al recibir la data
      }
    };

    obtenerInfoMicorrizas();
  }, []);

  const dataUsoMicorrizas = {
    labels: ['2018', '2019', '2020', '2021', '2022'],
    datasets: [
      {
        label: 'Incremento del uso de Micorrizas (%)',
        data: [10, 20, 30, 45, 60],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

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
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <MenuLateral collapsed={collapsed} />
      </Sider>

      <Layout>
        <MenuSuperior />

        <Content style={{ margin: '16px' }}>
          <Row className="mb-2">
            <Col>
              <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Micorrizas: Beneficios y Usos</h1>
              <MigajasdePan paginas={[{ nombre: 'Micorrizas', ruta: '' }]} />
            </Col>
          </Row>

          {/* Mostrar el indicador de carga mientras se obtienen los datos */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', fontSize: '24px' }}>
              <Spin tip="Cargando información..." size="large" />
            </div>
          ) : (
            <>
              <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Col span={24}>
                  <Card title="¿Qué son las Micorrizas?" style={{ textAlign: 'left' }}>
                    {imagenMicorrizas && <img src={imagenMicorrizas} alt="Micorrizas" style={{ width: '100%', maxWidth: '400px', marginBottom: '20px' }} />}
                    <p>{infoMicorrizas || 'Cargando información sobre las micorrizas...'}</p>
                    <p>
                      Las micorrizas son asociaciones simbióticas entre hongos y las raíces de plantas. Estas asociaciones facilitan la absorción de agua y nutrientes, como el fósforo,
                      mientras que las plantas suministran azúcares y otros productos fotosintéticos a los hongos.
                    </p>
                  </Card>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card title="Incremento del uso de Micorrizas en la Agricultura" style={{ textAlign: 'center' }}>
                    <Line data={dataUsoMicorrizas} />
                  </Card>
                </Col>
              </Row>

              <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                <Col span={24}>
                  <Card title="Rendimiento Agrícola con y sin Micorrizas" style={{ textAlign: 'center' }}>
                    <Bar data={dataRendimientoAgricola} />
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Principal;
