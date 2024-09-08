import React, { useState } from 'react';
import { Layout, Menu, Card, Row, Col, Dropdown, Button } from 'antd';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';

import {
  PlusOutlined,
  CalendarOutlined,
  SearchOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import './Principal.css';

const { Header, Content, Sider } = Layout;

const Principal = () => {
  const [expanded, setExpanded] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleMenuVisibleChange = (visible) => {
    setMenuVisible(visible);
  };

  const handleLogout = () => {
    // Aquí podrías implementar la lógica para cerrar sesión
    // Por ejemplo, redirigir al usuario a la página de inicio de sesión
    // history.push('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key='logout' onClick={handleLogout}>
        <LogoutOutlined /> Cerrar Sesión
      </Menu.Item>
    </Menu>
  );

  const enfermedadesComunes = [
    { nombre: 'Resfriado común', sintomas: ['Congestión nasal', 'Tos', 'Estornudos', 'Dolor de garganta'] },
    { nombre: 'Gripe', sintomas: ['Fiebre', 'Escalofríos', 'Dolor muscular', 'Fatiga'] },
    { nombre: 'Dolor de cabeza', sintomas: ['Cefalea', 'Sensibilidad a la luz', 'Náuseas', 'Visión borrosa'] },
    { nombre: 'Dolor de garganta', sintomas: ['Dolor al tragar', 'Irritación', 'Ronquera', 'Ganglios inflamados'] },
    { nombre: 'Alergias', sintomas: ['Estornudos', 'Picazón en los ojos', 'Congestión nasal', 'Sarpullido'] },
    { nombre: 'Estrés', sintomas: ['Ansiedad', 'Irritabilidad', 'Dificultad para concentrarse', 'Problemas para dormir'] },
    { nombre: 'Hipertensión', sintomas: ['Dolor de cabeza', 'Fatiga', 'Mareos', 'Náuseas'] },
    { nombre: 'Diabetes', sintomas: ['Aumento de la sed', 'Hambre frecuente', 'Visión borrosa', 'Fatiga'] }
  ];

  const generateRandomData = () => {
    const data = {};
    enfermedadesComunes.forEach(enfermedad => {
      data[enfermedad.nombre] = ''; // No se asigna ningún valor específico
    });
    return data;
  };
  const { RangePicker } = DatePicker;

  const [value, setValue] = useState(null);

  const disabledDate = (current, { from }) => {
    if (from) {
      return Math.abs(current.diff(from, 'days')) >= 7;
    }
    return false;
  };
  const pacientesData = [
    { nombre: 'Paciente 1', edad: 35, genero: 'Masculino', ...generateRandomData() },
    { nombre: 'Paciente 2', edad: 28, genero: 'Femenino', ...generateRandomData() },
    { nombre: 'Paciente 3', edad: 45, genero: 'Masculino', ...generateRandomData() },
    { nombre: 'Paciente 4', edad: 52, genero: 'Femenino', ...generateRandomData() },
    { nombre: 'Paciente 5', edad: 22, genero: 'Femenino', ...generateRandomData() },
    { nombre: 'Paciente 6', edad: 40, genero: 'Masculino', ...generateRandomData() },
    { nombre: 'Paciente 7', edad: 32, genero: 'Masculino', ...generateRandomData() },
    { nombre: 'Paciente 8', edad: 60, genero: 'Femenino', ...generateRandomData() }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={expanded ? 200 : 80}
        theme='dark'
        collapsible
        collapsed={!expanded}
        onCollapse={toggleExpanded}
        collapsedWidth={80}
      >
        <div className='logo' />
        
        <Menu theme='dark' mode='vertical'>
          <Menu.Item key='logout' icon={<UserOutlined />}>
            <Link to='/Loginn'>Salir</Link>
          </Menu.Item>
          <Menu.Item key='crearCita' icon={<PlusOutlined />}>
            <Link to='/crear-cita'>Crear una cita</Link>
          </Menu.Item>
          <Menu.Item key='calendario' icon={<CalendarOutlined />}>
            <Link to='/calendario'>Calendario</Link>
          </Menu.Item>
          <Menu.Item key='consultarCita' icon={<SearchOutlined />}>
            <Link to='/consultarCita'>Consultar una cita</Link>
          </Menu.Item>
          
        </Menu>
      </Sider>
      <Layout>
   
        <Content style={{ margin: '16px' }}>

        <RangePicker value={value} disabledDate={disabledDate} onChange={setValue} />;

          <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
            <h1>Dashboard de Pacientes</h1>
            <Row gutter={16}>
              {pacientesData.map((paciente, index) => (
                <Col key={index} span={8}>
                  <Card title={`Paciente: ${paciente.nombre}`} style={{ marginBottom: 20 }}>
                    <p><strong>Edad:</strong> {paciente.edad}</p>
                    <p><strong>Género:</strong> {paciente.genero}</p>
                    <p><strong>Síntomas:</strong></p>
                    {enfermedadesComunes.map(enfermedad => (
                      <p key={enfermedad.nombre}><strong>{enfermedad.nombre}:</strong> {enfermedad.sintomas.join(', ')}</p>
                    ))}
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Principal;
