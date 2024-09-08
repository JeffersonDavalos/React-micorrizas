import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined, CalendarOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';

const MenuLateral = ({ expanded }) => {
  return (
    <Menu theme="dark" mode="vertical" inlineCollapsed={!expanded}>
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
  );
};

export default MenuLateral;
