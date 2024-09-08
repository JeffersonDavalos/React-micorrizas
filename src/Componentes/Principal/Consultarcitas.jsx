import React, { useState } from 'react';
import { Layout, Menu, Input, Button, Space, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined, CalendarOutlined, SearchOutlined,UserOutlined } from '@ant-design/icons';
import './Principal.css';

const { Header, Content, Sider } = Layout;

const Principal = () => {
  const [expanded, setExpanded] = useState(false);
  const [cedula, setCedula] = useState('');
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleCedulaChange = (e) => {
    setCedula(e.target.value);
  };

  const handleFechaInicioChange = (date) => {
    setFechaInicio(date);
  };

  const handleFechaFinChange = (date) => {
    setFechaFin(date);
  };

  const handleSearch = () => {
    console.log('Cédula:', cedula);
    console.log('Fecha de inicio:', fechaInicio);
    console.log('Fecha de fin:', fechaFin);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={expanded ? 200 : 80}
        theme='dark'
        collapsible
        collapsed={!expanded}
        onCollapse={(collapsed) => setExpanded(!collapsed)}
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
      <Content>
        <div style={{ padding: 24 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input.Search
              placeholder="Buscar por cédula"
              enterButton="Buscar"
              value={cedula}
              onChange={handleCedulaChange}
            />
            <Space>
              <DatePicker.RangePicker
                placeholder={['Fecha de inicio', 'Fecha de fin']}
                onChange={(dates) => {
                  if (dates && dates.length === 2) {
                    setFechaInicio(dates[0]);
                    setFechaFin(dates[1]);
                  } else {
                    setFechaInicio(null);
                    setFechaFin(null);
                  }
                }}
              />
              <Button type="primary" onClick={handleSearch}>Buscar</Button>
            </Space>
          </Space>
        </div>
      </Content>
    </Layout>
  );
};

export default Principal;
