import React from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { PlusOutlined, CalendarOutlined, SearchOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const MenuLateralConSuperior = ({ expanded }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Perfil
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />}>
        Cerrar Sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Sider collapsible collapsed={!expanded} style={{ height: '100vh', background: '#001529' }}>
      <div style={{ padding: '16px', textAlign: 'center', background: '#001529' }}>
        <img
          src={require('../Imagenes/gratis-png-universidad-politecnica-salesiana-educacion-superior-universidad-don-bosco-campus-de-estudios-de-posgrado.png')}
          alt="Logo Universidad"
          style={{ width: expanded ? '80%' : '50%', height: 'auto', transition: 'width 0.3s' }}
        />
      </div>

      <Menu theme="dark" mode="inline" inlineCollapsed={!expanded} style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="logout" icon={<UserOutlined />}>
          <Link to="/Loginn">Salir</Link>
        </Menu.Item>
        <Menu.Item key="crearCita" icon={<PlusOutlined />}>
          <Link to="/crear-cita">Crear una cita</Link>
        </Menu.Item>
        <Menu.Item key="calendario" icon={<CalendarOutlined />}>
          <Link to="/calendario">Calendario</Link>
        </Menu.Item>
        <Menu.Item key="consultarCita" icon={<SearchOutlined />}>
          <Link to="/consultarCita">Consultar una cita</Link>
        </Menu.Item>
      </Menu>
      <div style={{ padding: '16px', textAlign: 'center', background: '#001529', position: 'absolute', bottom: '0', width: '100%' }}>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
        </Dropdown>
      </div>
    </Sider>
  );
};

export default MenuLateralConSuperior;
