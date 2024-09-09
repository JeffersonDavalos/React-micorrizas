import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, ExperimentOutlined, PlusOutlined, CalendarOutlined, SearchOutlined } from '@ant-design/icons';

const MenuLateral = ({ collapsed }) => {
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const { id_perfil } = userData;

  return (
    <div style={{ height: '100%' }}>
      <div style={{ padding: '0 16px', textAlign: 'center', backgroundColor: '#fff', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src={collapsed ? require('../Imagenes/logo.png') : require('../Imagenes/logo2.png')} 
          alt="Logo"
          style={{ height: '100%', maxHeight: '64px', width: 'auto', transition: 'width 0.2s ease-in-out' }} 
        />
      </div>
      <Menu theme="dark" mode="inline" style={{ height: '100%', transition: 'all 0.2s ease-in-out' }}>
        <Menu.SubMenu key="usuarios" icon={<UserOutlined />} title="Usuarios">
          {id_perfil === 1 && (
            <Menu.Item key="usuarioCrear">
              <Link to="/usuario">Usuario</Link>
            </Menu.Item>
          )}
          <Menu.Item key="usuarioActualizar">
            <Link to="/actualizar-usuario">Actualizar Usuario</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="micorrizas" icon={<ExperimentOutlined />} title="Micorrizas">
          <Menu.Item key="modeloMicorrizas">
            <Link to="/modelo-micorrizas">Modelo Micorrizas</Link>
          </Menu.Item>
          <Menu.Item key="reentrenamientoMicorrizas">
            <Link to="/reentrenamiento-micorrizas">Reentrenamiento</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default MenuLateral;
