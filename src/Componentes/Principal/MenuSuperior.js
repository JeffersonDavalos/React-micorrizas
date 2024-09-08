import React from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { BellOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

const MenuSuperior = () => {
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
    <Header className="site-layout-background" style={{ padding: 0, background: '#fff' }}>
      <div style={{ float: 'right', marginRight: 16 }}>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
};

export default MenuSuperior;
