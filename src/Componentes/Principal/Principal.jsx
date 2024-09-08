import React, { useState } from 'react';
import { Layout, Card, Row, Col, DatePicker } from 'antd';
import MenuLateral from './MenuLateral';
import MenuSuperior from './MenuSuperior';
import './Principal.css';

const { Content, Sider } = Layout;

const Principal = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const enfermedadesComunes = [
    { nombre: 'Resfriado común', sintomas: ['Congestión nasal', 'Tos', 'Estornudos', 'Dolor de garganta'] },
    { nombre: 'Gripe', sintomas: ['Fiebre', 'Escalofríos', 'Dolor muscular', 'Fatiga'] },
    { nombre: 'Dolor de cabeza', sintomas: ['Cefalea', 'Sensibilidad a la luz', 'Náuseas', 'Visión borrosa'] },
    // Otras enfermedades comunes
  ];

  const generateRandomData = () => {
    const data = {};
    enfermedadesComunes.forEach(enfermedad => {
      data[enfermedad.nombre] = ''; // No se asigna ningún valor específico
    });
    return data;
  };

  const pacientesData = [
    { nombre: 'Paciente 1', edad: 35, genero: 'Masculino', ...generateRandomData() },
    { nombre: 'Paciente 2', edad: 28, genero: 'Femenino', ...generateRandomData() },
    // Otros pacientes...
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Menú lateral */}
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <div className="logo" />
        <MenuLateral collapsed={collapsed} />
      </Sider>

      {/* Menú superior + Contenido */}
      <Layout>
        <MenuSuperior />

        {/* Contenido principal */}
        <Card style={{ marginTop: '15px' }}>

        <Content style={{ margin: '16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <h1 style={{ textAlign: 'center' }}>Dashboard de Pacientes</h1>
            <Row gutter={[16, 16]} justify="center">
              {pacientesData.map((paciente, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    title={`Paciente: ${paciente.nombre}`}
                    style={{ marginBottom: 20, textAlign: 'center' }}
                  >
                    <p><strong>Edad:</strong> {paciente.edad}</p>
                    <p><strong>Género:</strong> {paciente.genero}</p>
                    {enfermedadesComunes.map(enfermedad => (
                      <p key={enfermedad.nombre}><strong>{enfermedad.nombre}:</strong> {enfermedad.sintomas.join(', ')}</p>
                    ))}
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Content>
        </Card>
      </Layout>
    </Layout>
  );
};

export default Principal;
