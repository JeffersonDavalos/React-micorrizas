import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined, CalendarOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import './MenuLateral.css'; // Estilos personalizados si son necesarios

const MenuLateral = ({ expanded }) => {
  return (
    <div style={{ height: '100%' }}>
      {/* Logo en la parte superior con el mismo grosor que el menú superior */}
      <div style={{ padding: '0 16px', textAlign: 'center', backgroundColor: '#fff', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src={expanded ? require('../Imagenes/logo2.png') : require('../Imagenes/logo.png')} 
          alt="Logo Universidad"
          style={{ height: '100%', maxHeight: '64px', width: 'auto', transition: 'width 0.3s' }} // Ajusta el tamaño según sea necesario
        />
      </div>

      {/* Menú de navegación con fondo oscuro */}
      <Menu theme="dark" mode="inline" inlineCollapsed={!expanded} style={{ height: '100%', borderRight: 0 }}>
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
    </div>
  );
};

export default MenuLateral;
