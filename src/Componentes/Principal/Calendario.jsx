import React, { useState } from 'react';
import { Layout, Menu, Calendar } from 'antd'; // Importa Calendar desde antd
import { Link } from 'react-router-dom';
import {
  PlusOutlined,
  CalendarOutlined,
  SearchOutlined,
  UserOutlined
} from '@ant-design/icons';
import './Principal.css';

const { Header, Content, Sider } = Layout;

const Principal = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
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
        {/* Agrega el componente Calendar de Ant Design aquí */}
        <div style={{ padding: '24px', background: '#fff', minHeight: 360 }}>
          <Calendar />
        </div>
      </Content>
    </Layout>
  );
};

export default Principal;
