import React from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const MenuSuperior = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Perfil
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />}>
        <Link to="/Loginn">Cerrar Sesión</Link> {/* Función de cerrar sesión */}
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background" style={{ padding: 0, background: '#fff', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      {/* Dropdown de perfil y cerrar sesión */}
      <div style={{ marginRight: 16 }}>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
};

export default MenuSuperior;
